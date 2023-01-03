import {signOut} from "firebase/auth";
import {auth} from "../firebase";
import {AppRoutes} from "../common/RoutePage/Routes";

export const signOutUser = async (callback) => {
    try {
        const res = await signOut(auth)
        // console.log(res)
        // console.log(auth.currentUser)
        callback(AppRoutes.register)
    } catch (e){
        console.log(e);
    }
};

export const setFormData = (value, key, callback) => {
    callback((prevState)=>{
        return{
            ...prevState,
            [key]: value,
        }
    });
};
