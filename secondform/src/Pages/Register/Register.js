import styles from "./Register.module.css";
import {useState} from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase";
import { useNavigate } from 'react-router-dom';
import {AppRoutes} from "../../common/RoutePage/Routes";


const Register = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState ({
        name: '',
        email: '',
        password: '',
    })

    const registerUser = async () => { // connecting and sending data to with firebase and localhost
        const user = await createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
            .then((res) => res.user)
            .catch((error) => console.log(error));
        console.log(auth.currentUser)
        localStorage.setItem('authUser', JSON.stringify( {
            token: user.accessToken,
            id: user.uid
        }))
        auth?.currentUser?.uid && navigate(AppRoutes.login)
    }

    const handleSubmit = (e)=> {
        e.preventDefault();
        registerUser();
    }

    const setFormData = (value, key) => {
        setFormValues((prevState)=>{
            return{
                ...prevState,
                [key]: value,
            }
        });
    };

    return(
        <div className={styles.mainBox}>
            <div className={styles.main}>
                <h1>Register</h1>
                <hr />
                <div className={styles.form}>
                    <form onSubmit={handleSubmit}>
                        <label>Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type='text' style={{width: '200px', height: '22px'}} value={formValues.name}
                            onChange = {(e)=> setFormData(e.target.value, 'name')}/>
                        </label>
                        <br/><br/>

                        <label>Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type='email' style={{width: '200px', height: '22px'}} value={formValues.email}
                                   onChange = {(e)=> setFormData(e.target.value, 'email')}/>
                            
                        </label>
                        <br/><br/>

                        <label>Password: &nbsp;&nbsp;
                            <input type='password' style={{width: '200px', height: '22px'}} value ={formValues.password}
                                   onChange = {(e)=> setFormData(e.target.value, 'password')}/>
                        </label>
                        <br/><br/>
                        <button type='submit'>Create</button>
                    </form>

                </div>

            </div>

        </div>
    )
}

export default Register;