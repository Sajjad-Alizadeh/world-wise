import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {lazy, Suspense} from "react";

import "./index.css"
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import {CitiesProvider} from "./contexts/CitiesProvider.jsx";
import {AuthProvider} from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

const Product = lazy(() => import("./pages/Product.jsx"))
const Pricing = lazy(() => import("./pages/Pricing.jsx"))
const HomePage = lazy(() => import("./pages/Homepage.jsx"))
const Login = lazy(() => import("./pages/Login.jsx"))
const AppLayout = lazy(() => import("./pages/AppLayout.jsx"))
const PageNotFound = lazy(() => import("./pages/PageNotFound.jsx"))


export default function App() {
    return (
        <AuthProvider>
            <CitiesProvider>
                <Suspense fallback={<SpinnerFullPage/>}>
                    <BrowserRouter>
                        <Routes>
                            <Route index element={<HomePage/>}/>
                            <Route path={"product"} element={<Product/>}/>
                            <Route path={"pricing"} element={<Pricing/>}/>
                            <Route path={"app"} element={
                                <ProtectedRoute>
                                    <AppLayout/>
                                </ProtectedRoute>
                            }>
                                <Route index element={<Navigate replace to={"cities"}/>}/>
                                <Route path={"cities"} element={<CityList/>}/>
                                <Route path={"cities/:id"} element={<City/>}/>
                                <Route path={"countries"} element={<CountryList/>}/>
                                <Route path={"form"} element={<Form/>}/>
                            </Route>
                            <Route path={"login"} element={<Login/>}/>
                            <Route path="*" element={<PageNotFound/>}/>
                        </Routes>
                    </BrowserRouter>
                </Suspense>
            </CitiesProvider>
        </AuthProvider>

    );
}