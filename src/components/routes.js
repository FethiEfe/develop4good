import React,{Component}  from "react"
import {Switch,Route} from "react-router-dom"
import About from "./About/About"
import Contact from "./Contact/Contact"
import Login from "./Login/Login"
import Home from "./Home/Home"
import ErrorPage from "./ErrorPage/ErrorPage"
import SignupDev from "./SignupDev/SignupDev"
import SignupChar from "./SignupChar/SignupChar"

export default  (
    <Switch>
        <Route exact path = "/" component = {Home} />
        <Route path = "/about" component = {About}/>
        <Route path = "/contact" component = {Contact} />
        <Route path = "/login" component = {Login} />
        <Route path = "/signupdev" component = {SignupDev} />
        <Route path = "/signupchar" component = {SignupChar} />
        <Route path = "/"  component = {ErrorPage}/>
    </Switch>

)