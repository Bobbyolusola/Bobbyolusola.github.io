import styles from './Header.module.css'
import {Link} from "react-router-dom";
import {useState} from "react";
import {AppRoutes} from "../../common/RoutePage/Routes";

const Header = () => {
    const [isHoveringReg, setIsHoveringReg] = useState(false);
    const handleMouseEnterReg = () => {
        setIsHoveringReg(true);
    };const handleMouseLeaveReg = () => {
        setIsHoveringReg(false);
    };

    const [isHoveringLog, setIsHoveringLog] = useState(false);
    const handleMouseEnterLog = () => {
        setIsHoveringLog(true);
    };const handleMouseLeaveLog = () => {
        setIsHoveringLog(false);
    };

    const [isHoveringCon, setIsHoveringCon] = useState(false);
    const handleMouseEnterCon = () => {
        setIsHoveringCon(true);
    };const handleMouseLeaveCon = () => {
        setIsHoveringCon(false);
    };

    return(
        <div className={styles.mainContainer}>
            <div className={styles.main}>
                <Link style={{textDecoration: 'none', backgroundColor: isHoveringReg ? '#004481' : '',
                    color: isHoveringReg ? 'white' : '',
                }}
                      onMouseEnter={handleMouseEnterReg}
                      onMouseLeave={handleMouseLeaveReg} to={AppRoutes.register}>Register</Link>
                <Link style={{textDecoration: 'none', backgroundColor: isHoveringLog ? '#004481' : '',
                    color: isHoveringLog ? 'white' : '',
                }}
                      onMouseEnter={handleMouseEnterLog}
                      onMouseLeave={handleMouseLeaveLog} to={AppRoutes.login}>Login</Link>
                <Link style={{textDecoration: 'none', backgroundColor: isHoveringCon ? '#004481' : '',
                    color: isHoveringCon ? 'white' : '',
                }}
                      onMouseEnter={handleMouseEnterCon}
                      onMouseLeave={handleMouseLeaveCon} to={AppRoutes.contact}>Contact</Link>

            </div>
        </div>
    )
}

export default Header;