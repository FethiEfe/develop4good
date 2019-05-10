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

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const UPDATE_MY_PROFILE_INFO = "UPDATE_MY_PROFILE_INFO";
const GET_DEV_PROFILE_PIC = "GET_DEV_PROFILE_PIC";
const UPDATE_CHAR_PROFILE_INFO = "UPDATE_CHAR_PROFILE_INFO";
const GET_CHAR_PROFILE_PIC = "GET_CHAR_PROFILE_PIC";
const GET_SESSION = "GET_SESSION"


// Action Cretor


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
        payload: axios.put("/api/updateprofile", { id, first_name, last_name, email, linkedin, skills })
    }
}

export function getDevProfilePic(id) {
  
    
    return {
        type: GET_DEV_PROFILE_PIC,
        payload: axios.get(`/api/getprofile/${id}`)
    }
}

export function updateCharProfileInfo(char_id, nameOfOrganization, website, email, charLinkedin, mission) {
    return {
        type: UPDATE_CHAR_PROFILE_INFO,
        payload: axios.put("/api/updatecharprofile", { char_id, nameOfOrganization, website, email, charLinkedin, mission })
    }
}

export function getCharProfilePic(char_id) {
  
    
    return {
        type: GET_CHAR_PROFILE_PIC,
        payload: axios.get(`/api/getcharprofile/${char_id}`)
    }
}

export function getSession() {
  
    
    return {
        type: GET_SESSION,
        payload: axios.get("/auth/cookie")
    }
}

export default function reducer(state = initialState, action) {
   
    switch (action.type) {
        
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

        case `${GET_DEV_PROFILE_PIC}_FULFILLED`:
        return {
                ...state,
                img: action.payload.data.img
                
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

        case `${GET_CHAR_PROFILE_PIC}_FULFILLED`:
        return {
                ...state,
                charimg: action.payload.data.charimg
                
        }

        case `${GET_SESSION}_FULFILLED` :
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
        
        default:
            return state;
    }
}
