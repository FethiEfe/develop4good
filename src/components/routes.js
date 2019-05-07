import React,{Component}  from "react"
import {Switch,Route} from "react-router-dom"
import About from "./About/About"
import Contact from "./Contact/Contact"
import Login from "./Login/Login"
import Home from "./Home/Home"
import SupportCommunity from "./SupportCommunity/SupportCommunity"
import ErrorPage from "./ErrorPage/ErrorPage"
import SignupDev from "./SignupDev/SignupDev"
import SignupChar from "./SignupChar/SignupChar"
import FindProject from "./Developer/FindProject/FindProject"
import AppliedProject from "./Developer/AppliedProject/AppliedProject"
import MyProfile from "./Developer/MyProfile/MyProfile"
import ViewProfile from "./Charities/ViewProfile/ViewProfile"
import PostProject from "./Charities/PostProject/PostProject"
import ViewProject from "./Developer/FindProject/ViewProject"
import ViewAppliedProject from "./Developer/AppliedProject/ViewAppliedProject"
import MyProject from "./Charities/MyProject/MyProject"
import ViewDevelopers from "./Charities/MyProject/ViewDevelopers"

export default  (
    <Switch>
        <Route exact path = "/" component = {Home} />
        <Route path = "/about" component = {About}/>
        <Route path = "/contact" component = {Contact} />
        <Route path = "/login" component = {Login} />
        <Route path = "/supportcommunity" component = {SupportCommunity} />
        <Route path = "/signupdev" component = {SignupDev} />
        <Route path = "/signupchar" component = {SignupChar} />
        <Route exact path = "/dev/findproject" component = {FindProject} />
        <Route exact path = "/dev/appliedproject" component = {AppliedProject} />
        <Route path = "/dev/appliedproject/:id" component = {ViewAppliedProject} />
        <Route path = "/dev/myprofile" component = {MyProfile} />
        <Route path = "/char/viewprofile" component = {ViewProfile} />
        <Route path = "/char/postproject" component = {PostProject} />
        <Route exact path = "/char/myprojects" component = {MyProject} />
        <Route path = "/dev/findproject/:id" component = {ViewProject} />
        <Route path = "/char/myprojects/:project_id/:char_id" component = {ViewDevelopers} />
        <Route path = "/"  component = {ErrorPage}/>
    </Switch>

)