import React,{Component}  from "react"
import {Switch,Route} from "react-router-dom"
import About from "./About/About"
import Contact from "./Contact/Contact"
import Login from "./Login/Login"
import Home from "./Home/Home"
import ErrorPage from "./ErrorPage/ErrorPage"
import SignupDev from "./SignupDev/SignupDev"
import SignupChar from "./SignupChar/SignupChar"
import FindProject from "./Developer/FindProject/FindProject"
import AppliedProject from "./Developer/AppliedProject/AppliedProject"
import MyProfile from "./Developer/MyProfile/MyProfile"
import ViewProfile from "./Charities/ViewProfile/ViewProfile"
import PostProject from "./Charities/PostProject/PostProject"

export default  (
    <Switch>
        <Route exact path = "/" component = {Home} />
        <Route path = "/about" component = {About}/>
        <Route path = "/contact" component = {Contact} />
        <Route path = "/login" component = {Login} />
        <Route path = "/signupdev" component = {SignupDev} />
        <Route path = "/signupchar" component = {SignupChar} />
        <Route path = "/dev/findproject" component = {FindProject} />
        <Route path = "/dev/appliedproject" component = {AppliedProject} />
        <Route path = "/dev/myprofile" component = {MyProfile} />
        <Route path = "/char/viewprofile" component = {ViewProfile} />
        <Route path = "/char/postproject" component = {PostProject} />

        <Route path = "/"  component = {ErrorPage}/>
    </Switch>

)