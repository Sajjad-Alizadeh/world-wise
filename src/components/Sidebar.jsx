import style from "./Sidebar.module.css"
import Footer from "./Footer.jsx";
import Logo from "./Logo.jsx";
import AppNav from "./AppNav.jsx";
import {Outlet} from "react-router-dom";

export default function Sidebar() {
    return (
        <div className={style.sidebar}>
            <Logo/>
            <AppNav/>

            <Outlet/>

            <Footer/>
        </div>
    )
}