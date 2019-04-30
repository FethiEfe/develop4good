import {createStore, applyMiddleware, combineReducers} from "redux";
import promise from "redux-promise-middleware"
import auth from "./ducks/auth"
import developerReducer from "./ducks/developerReducer"


const rootReducer = combineReducers({
    auth,
    developerReducer
})


export default createStore(rootReducer, applyMiddleware(promise))

