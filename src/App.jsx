import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import "./index.css"
import routes from "../constants/Routes.js";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={routes.PRODUCT} element={<Product/>}/>
                <Route path={routes.PRICING} element={<Pricing/>}/>
                <Route path={routes.APP} element={<AppLayout/>}/>
                <Route path={routes.LOGIN} element={<Login/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}