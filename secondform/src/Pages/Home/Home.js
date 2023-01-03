import {signOutUser} from "../../Helpers/js-helpers";
import {useNavigate} from "react-router-dom";
import styles from "../Register/Register.module.css";

const Home = () => {
    const navigate = useNavigate();
    return(
        <div>
            <div className={styles.mainBox}>
                <div className={styles.main}>
            <h1>Home</h1>

            <button type='button' style={{ width: 150  }} on onClick={()=>signOutUser(navigate)}> SignOut </button>
                </div>
            </div>
        </div>
    )
}

export default Home;