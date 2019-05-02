import {createStore, applyMiddleware, combineReducers} from "redux";
import promise from "redux-promise-middleware"
import auth from "./ducks/auth"

const rootReducer = combineReducers({
    auth,
 
})


export default createStore(rootReducer, applyMiddleware(promise))

