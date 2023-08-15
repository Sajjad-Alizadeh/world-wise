import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import "./index.css"
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import {useEffect, useState} from "react";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";

const BASE_URL = "http://localhost:8000"
export default function App() {
    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getCityList() {
            const response = await fetch(`${BASE_URL}/cities`)
            const data = await response.json()
            setCities(data)
        }

        try {
            getCityList()
        } catch (e) {
            alert("Error occurred")
        } finally {
            setIsLoading(false)
        }

    }, []);

    const citiesElement = (
        <CityList cities={cities}
                  isLoading={isLoading}
        />
    )

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage/>}/>
                <Route path={"product"} element={<Product/>}/>
                <Route path={"pricing"} element={<Pricing/>}/>
                <Route path={"app"} element={<AppLayout/>}>
                    <Route index element={<Navigate replace to={"cities"} />}/>
                    <Route path={"cities"} element={citiesElement}/>
                    <Route path={"cities/:id"} element={<City/>}/>
                    <Route path={"countries"} element={<CountryList isLoading={isLoading} cities={cities}/>}/>
                    <Route path={"form"} element={<Form/>}/>
                </Route>
                <Route path={"login"} element={<Login/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}