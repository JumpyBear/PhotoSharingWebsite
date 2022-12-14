import React, { useReducer, createContext } from 'react'
import jwtDecode from 'jwt-decode'

// set auth context init
const initialState = {
    user: null
}

if(window.localStorage.getItem('token')) {
    const codedToken = window.localStorage.getItem('token')
    // decode the token
    const decodedToken = jwtDecode(codedToken)

    // if the token expired
    if(decodedToken.exp * 1000 < Date.now()) {
        window.localStorage.removeItem('token')
    } else {
        // valid token
        initialState.user = decodedToken
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
})

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state     
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState)
    const login = (userData) => {
        window.localStorage.setItem('token', userData.token)
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    function logout() {
        window.localStorage.removeItem('token')
        dispatch({
            type: 'LOGOUT'
        })
    }

    return (
        <AuthContext.Provider
            value={{user: state.user, login, logout}}
            {...props}
        />
    )
}

export {AuthContext, AuthProvider}