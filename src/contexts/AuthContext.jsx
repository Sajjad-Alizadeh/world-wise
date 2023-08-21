import {createContext, useContext, useReducer} from "react";

const AuthContext = createContext()

const initState = {
    user: null,
    isLoggedIn: false
}
const reducerActionTypes = {
    LOGIN: "login",
    LOGOUT: "logout",
}

function reducer(state, action) {
    switch (action.type) {
        case reducerActionTypes.LOGIN:
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true
            }
        case reducerActionTypes.LOGOUT:
            return {
                ...state,
                user: null,
                isLoggedIn: false
            }
        default:
            throw new Error("")
    }
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({children}) {
    const [{user, isLoggedIn}, dispatch] = useReducer(reducer, initState, undefined)

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({type: reducerActionTypes.LOGIN, payload: FAKE_USER})
        }
    }

    function logout() {
        dispatch({type: reducerActionTypes.LOGOUT})
    }

    return (
        <AuthContext.Provider value={{
            user,
            isLoggedIn,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )

}

function useAuthContext() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("AuthContext used outside AuthContextProvider")
    }
    return context
}

export {AuthProvider, useAuthContext}