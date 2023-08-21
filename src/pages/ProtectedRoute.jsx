import {useAuthContext} from "../contexts/AuthContext.jsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import routes from "../../constants/Routes.js";

export default function ProtectedRoute({children}) {
    const {isLoggedIn} = useAuthContext()
    const navigate = useNavigate()
    useEffect(() => {
        if (!isLoggedIn) {
            navigate(routes.HOME)
        }
    }, [isLoggedIn, navigate]);


    return (
        isLoggedIn ? children : null
    )
}