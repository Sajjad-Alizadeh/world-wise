import style from "./AppNav.module.css"
import {NavLink} from "react-router-dom";
import routes from "../../constants/Routes.js";

export default function AppNav() {
    return (
        <nav className={style.nav}>
            <ul>
                <li>
                    <NavLink to={routes.CITIES}>City</NavLink>
                </li>
                <li>
                    <NavLink to={routes.COUNTRIES}>Country</NavLink>
                </li>
            </ul>
        </nav>
    )
}