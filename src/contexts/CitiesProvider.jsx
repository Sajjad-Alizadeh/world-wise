import {createContext, useCallback, useContext, useEffect, useReducer} from "react";

const BASE_URL = "http://localhost:8000"
const CitiesContext = createContext()

const initState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: ''
}

const reducerType = {
    LOADING: "loading",
    CITIES_LOADED: "cities/loaded",
    CITY_LOADED: "city/loaded",
    CITY_CREATED: "CITY/CREATE",
    UPDATE_CURRENT_CITY: "updateCurrentCities",
    CITY_DELETED: "CITY/DELETED",
    REJECTED: "REJECTED",
}

function reducer(state, action) {
    switch (action.type) {
        case reducerType.LOADING:
            return {
                ...state,
                isLoading: true
            }
        case reducerType.CITIES_LOADED:
            return {
                ...state,
                cities: action.payload,
                isLoading: false
            }
        case reducerType.CITY_LOADED:
            return {
                ...state,
                currentCity: action.payload,
                isLoading: false
            }
        case reducerType.CITY_CREATED:
            return {
                ...state,
                cities: [...state.cities, action.payload],
                isLoading: false
            }
        case reducerType.CITY_DELETED:
            return {
                ...state,
                cities: state.cities.filter(city => city.id !== action.payload),
                isLoading: false
            }
    }
}

function CitiesProvider({children}) {
    const [{
        cities,
        isLoading,
        currentCity
    }, dispatch] = useReducer(reducer, initState, undefined)

    function doDispatch(type, payload) {
        if (payload !== undefined) {
            dispatch({type, payload})
        } else {
            dispatch({type})
        }
    }

    useEffect(() => {
        async function getCityList() {
            doDispatch(reducerType.LOADING)
            try {
                const response = await fetch(`${BASE_URL}/cities`)
                const data = await response.json()
                doDispatch(reducerType.CITIES_LOADED, data)
            } catch (e) {
                doDispatch(reducerType.REJECTED, "failed to get city list")
            }
        }

        getCityList()
    }, []);

    const getCity = useCallback(async function getCity(id) {
        doDispatch(reducerType.LOADING)
        try {
            const response = await fetch(`${BASE_URL}/cities/${id}`)
            const data = await response.json()
            doDispatch(reducerType.CITY_LOADED, data)
        } catch (e) {
            doDispatch(reducerType.REJECTED, "failed to get city")
        }
    }, [])

    async function createCity(newCity) {
        doDispatch(reducerType.LOADING)
        try {
            const response = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            doDispatch(reducerType.CITY_CREATED, data)
        } catch (e) {
            doDispatch(reducerType.REJECTED, "failed to create city")
        }

    }

    async function deleteCity(id) {
        doDispatch(reducerType.LOADING)
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE"
            })
            doDispatch(reducerType.CITY_DELETED, id)
        } catch (e) {
            doDispatch(reducerType.REJECTED, "failed to delete city")
        }

    }

    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            getCity,
            createCity,
            deleteCity
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