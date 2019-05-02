import axios from "axios"


const initialState = {
    //developer part
    username: "",
    email: "",
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    linkedin: "",
    skills: "",
    img: "",

    //charities part
    charUsername: "",
    nameOfOrganization : "",
    website: "",
    charemail: "",
    charLinkedin: "",
    mission:"",
    char_id: "",
    charimg:"",

    isLogedIn: false

}

// Action Types


const SIGN_UP_DEV = "SIGN_UP_DEV";
const SIGN_UP_CHAR = "SIGN_UP_DEV";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const UPDATE_MY_PROFILE_INFO = "UPDATE_MY_PROFILE_INFO";
const UPDATE_MY_PROFILE_PIC = "UPDATE_MY_PROFILE_PIC";
const UPDATE_CHAR_PROFILE_INFO = "UPDATE_CHAR_PROFILE_INFO";


// Action Cretor

export function signupDev(username, email, password) {
    return {
        type: SIGN_UP_DEV,
        payload: axios.post("/auth/developers", { username, email, password })
    }
}

export function signupChar(username, email, password) {
    return {
        type: SIGN_UP_CHAR,
        payload: axios.post("/auth/signupchar", { username, email, password })
    }
}

export function login(username, password) {
    return {
        type: LOGIN,
        payload: axios.post("/auth/login", { username, password })
    }
}

export function logout() {
    return {
        type: LOGOUT,
        payload: axios.get("/auth/logout")
    }
}

export function updateMyProfileInfo(id, first_name, last_name, email, linkedin, skills) {
    return {
        type: UPDATE_MY_PROFILE_INFO,
        payload: axios.post("/api/updateprofile", { id, first_name, last_name, email, linkedin, skills })
    }
}




export function updateCharProfileInfo(char_id, nameOfOrganization, website, email, charLinkedin, mission) {
    return {
        type: UPDATE_CHAR_PROFILE_INFO,
        payload: axios.post("/api/updatecharprofile", { char_id, nameOfOrganization, website, email, charLinkedin, mission })
    }
}

export default function reducer(state = initialState, action) {
   
    switch (action.type) {
        case `${SIGN_UP_DEV}_FULFILLED`:
        
            return {
                ...state,
                id: action.payload.data.id,
                username: action.payload.data.username,
                email: action.payload.data.email,
                isLogedIn: true
            }

        case `${SIGN_UP_CHAR}_FULFILLED`:
            return {
                ...state,
                char_id: action.payload.data.char_id,
                username: action.payload.data.username,
                charemail: action.payload.data.email,
                isLogedIn: true

            }

        case `${LOGIN}_FULFILLED`:
       
            return {
                ...state,
                username: action.payload.data.username,
                email: action.payload.data.email,
                id: action.payload.data.id,
                first_name: action.payload.data.first_name,
                last_name: action.payload.data.last_name,
                email: action.payload.data.email,
                linkedin: action.payload.data.linkedin,
                skills: action.payload.data.skills,
                img:action.payload.data.img,
                
                charUsername:action.payload.data.username,
                char_id: action.payload.data.char_id,
                charemail: action.payload.data.charemail,
                nameOfOrganization: action.payload.data.nameOfOrganization,
                website: action.payload.data.website,
                charLinkedin: action.payload.data.charLinkedin,
                mission: action.payload.data.mission,
                charimg:action.payload.data.charimg,
                isLogedIn: true
            }

        case `${LOGOUT}_FULFILLED`:
        
            return {
                username: "",
                email: "",
                id: "",
                char_id: "",
                isLogedIn: false
            }

            
        // updating developers profile
        case `${UPDATE_MY_PROFILE_INFO}_FULFILLED`:
        return {
                ...state,
                first_name: action.payload.data.first_name,
                last_name: action.payload.data.last_name,
                email: action.payload.data.email,
                linkedin: action.payload.data.linkedin,
                skills: action.payload.data.skills,
                
        }
       

        case `${UPDATE_CHAR_PROFILE_INFO}_FULFILLED`:
      
        return {
                ...state,
                nameOfOrganization: action.payload.data.nameOfOrganization,
                website: action.payload.data.website,
                charemail: action.payload.data.email,
                charLinkedin: action.payload.data.charLinkedin,
                mission: action.payload.data.mission
                
        }
        
        default:
            return state;
    }
}