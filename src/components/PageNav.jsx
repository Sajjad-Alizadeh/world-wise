import styles from "./PageNav.module.css"
import {NavLink} from "react-router-dom";
import routes from "../../constants/Routes.js";
import Logo from "./Logo.jsx";

export default function PageNav() {
    return (
        <nav className={styles.nav}>
            <Logo/>
            <ul>
                <li>
                    <NavLink to={routes.PRODUCT}>Product</NavLink>
                </li>
                <li>
                    <NavLink to={routes.PRICING}>Pricing</NavLink>
                </li>
                <li>
                    <NavLink to={routes.LOGIN} className={styles.ctaLink}>Login</NavLink>
                </li>
            </ul>
        </nav>
    )
}