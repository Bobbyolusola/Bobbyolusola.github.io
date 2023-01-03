import styles from "../Register/Register.module.css";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase";
import {AppRoutes} from "../../common/RoutePage/Routes";
import {setFormData} from "../../Helpers/js-helpers";



const Login = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    })

    const signIn = async () => {  //connecting with firebase and localhost
        await signInWithEmailAndPassword(auth, formValues.email, formValues.password)
            .then((res) => res.user)
            .catch((error) => console.log(error));
        // console.log(auth.currentUser)
        // return user;
    }

    const handleLoginSubmit = async(e) => {
        e.preventDefault();
        await signIn();
        console.log(auth.currentUser)
        auth?.currentUser?.uid && navigate(AppRoutes.home)

    }
    return(
        <div>
            <div className={styles.mainBox}>
                <div className={styles.main}>
                    <h1>Login Information</h1>
                    <hr />
                    <div className={styles.form}>
                        <form onSubmit={handleLoginSubmit} >
                            <label>Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <input type='email' style={{width: '200px', height: '22px'}}
                                       onChange={(e)=> setFormData(e.target.value, 'email', setFormValues)}/>

                            </label>
                            <br/><br/>

                            <label>Password: &nbsp;&nbsp;
                                <input type='Password' style={{width: '200px', height: '22px'}}
                                       onChange={(e)=> setFormData(e.target.value, 'password', setFormValues)}/>
                            </label>
                            <br/><br/>
                            <button type='submit'>Login</button>
                            <br/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;