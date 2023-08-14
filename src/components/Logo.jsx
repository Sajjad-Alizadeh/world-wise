import styles from "./Logo.module.css";
import {Link} from "react-router-dom";
import routes from "../../constants/Routes.js";

function Logo() {
    return (
        <Link to={routes.HOME}>
            <img src="/logo.png" alt="WorldWise logo" className={styles.logo}/>
        </Link>
    );
}

export default Logo;
