import axios from "axios"


const initialState ={
    username: "",
    email: "",
    isLogedIn: false
    
}

// Action Types


const SIGN_UP_DEV = "SIGN_UP_DEV";
const  SIGN_UP_CHAR = "SIGN_UP_DEV";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT"


// Action Cretor

export function signupDev (username, email, password){
    return {
        type: SIGN_UP_DEV,
        payload: axios.post("/auth/developers", {username, email, password})
    }
}

export function signupChar (username, email, password){
    return {
        type: SIGN_UP_CHAR,
        payload: axios.post("/auth/signupchar", {username, email, password})
    }
}

export function login (username, password){
    return {
        type: LOGIN,
        payload: axios.post("/auth/login", {username, password})
    }
}

export function logout (){
    return {
        type: LOGOUT,
        payload: axios.get("/auth/logout")
    }
}

export default function reducer (state = initialState, action){
    switch(action.type){
        
        case `${SIGN_UP_DEV}_FULFILLED`:
        return {
            ...state,
            username: action.payload.data.username,
            email: action.payload.data.email,
            isLogedIn: true
        }

        case `${SIGN_UP_CHAR}_FULFILLED`:
        return {
            ...state,
            username: action.payload.data.username,
            email: action.payload.data.email,
            isLogedIn: true
        }

        case `${LOGIN}_FULFILLED`:
        return {
            ...state,
            username: action.payload.data.username,
            isLogedIn: true
        }

        case `${LOGOUT}_FULFILLED`:
        return {
            ...state,
            username: action.payload.data.username,
            isLogedIn: false
        }


        default:
        return state;
    }
}
