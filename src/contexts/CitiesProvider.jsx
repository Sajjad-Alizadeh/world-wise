import {createContext, useContext, useEffect, useState} from "react";

const BASE_URL = "http://localhost:8000"
const CitiesContext = createContext()

function CitiesProvider({children}) {
    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentCity, setCurrentCity] = useState({})

    useEffect(() => {
        async function getCityList() {
            try {
                setIsLoading(true)
                const response = await fetch(`${BASE_URL}/cities`)
                const data = await response.json()
                setCities(data)
            } catch (e) {
                alert("Error occurred")
            } finally {
                setIsLoading(false)
            }

        }
        getCityList()
    }, []);

    async function getCity(id) {
        try {
            setIsLoading(true)
            const response = await fetch(`${BASE_URL}/cities/${id}`)
            const data = await response.json()
            setCurrentCity(data)
        } catch (e) {
            alert("Error occurred")
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            getCity
        }}>
            {children}
        </CitiesContext.Provider>
    )
}

function useCitiesContext() {
    const context = useContext(CitiesContext)
    if (context === "undefined") {
        throw new Error("CitiesContext was used outside of the PostContextProvider")
    }
    return context
}

export {CitiesProvider, useCitiesContext}