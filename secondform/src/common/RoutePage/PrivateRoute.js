import {Navigate} from "react-router-dom";
import {auth} from "../../firebase.js";
import {AppRoutes} from "./Routes";

export const PrivateRoute = ({Component}) => {
    const user = auth?.currentUser
    return user?.uid
        ? <Component />
        : <Navigate to={AppRoutes.notFound} />
}