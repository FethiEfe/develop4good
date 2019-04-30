import axios from "axios"

const initialState = {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    linkedin: "",
    skills: "",
    img: "",

}

const UPDATE_MY_PROFILE_INFO = "UPDATE_MY_PROFILE_INFO_INFO";
const UPDATE_MY_PROFILE_PIC = "UPDATE_MY_PROFILE_PIC";

export function updateMyProfileInfo(id, first_name, last_name, email, linkedin, skills) {
    return {
        type: UPDATE_MY_PROFILE_INFO,
        payload: axios.post("/api/updateprofile", { id, first_name, last_name, email, linkedin, skills })
    }
}

export function updateMyProfilePic(img) {
    return {
        type: UPDATE_MY_PROFILE_PIC,
        payload: axios.post("/api/updateprofile", {img})
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_MY_PROFILE_INFO:
            return {
                ...state,
                id: action.payload.data.id,
                first_name: action.payload.data.first_name,
                last_name: action.payload.data.last_name,
                email: action.payload.data.email,
                linkedin: action.payload.data.linkedin,
                skills: action.payload.data.skills,
            }
        default:
        return state
    }
}