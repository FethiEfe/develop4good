import React,{Component} from 'react'
import axios from "axios"
import style from "./ViewDevelopers.module.scss"
import {Link, Redirect} from "react-router-dom"
import { connect } from "react-redux"
import {getSession} from "../../../redux/ducks/auth"

class ViewDevelopers extends Component{
    constructor(){
        super();
        this.state ={
            numDevInterested : [],
            redirect: false,
        }
    }
    componentDidMount(){
        const project_id = this.props.match.params.project_id
        this.getInterestedDevNum(project_id);
        this.props.getSession()
        .then(() => {
         
            if (!this.props.auth.char_id) {
                this.setState({
                    redirect: true
                })
            }
        
        })
       
    }

    getInterestedDevNum = (project_id) => {
        axios
        .get(`/char/getdevnumint/${project_id}`)
        .then(result => {
            this.setState({
            numDevInterested : result.data
            })
            
        })
        .catch(err => {
            console.log(err)
        })
    }


    render(){
        if (this.state.redirect) {
            return <Redirect to='/login' />
        }
        const developer = this.state.numDevInterested.map((developer, index) => {
            return(
                <div key = {index} className = {style.Card}>
                    <img src = {developer.img} className ={style.Image}/>
                    <h3 style ={{textAlign: "center"}}>{developer.first_name} {developer.last_name}</h3>
                    <h3 style ={{textAlign: "center"}}><span>Skills: </span>{developer.skills}</h3>
                    <h3 style ={{textAlign: "center"}}><span>Linkedin: </span><a href = {developer.linkedin} target ="_blank">{developer.linkedin}</a></h3>
                    
                    
                   
                    
                    <h3 style ={{textAlign: "center"}}><span>Email: </span>{developer.email}</h3>
                </div>
            )
        })
        return(
            <div className ={style.Body}>
                {(this.state.numDevInterested.length === 0) ? <h2 style = {{marginTop : "20vh", color: "red"}}>No one applied to your project yet!</h2> :   developer}
                 
                
            </div>
        )
    }
}
const mapStateToProps = Reduxstate => Reduxstate
export default connect(mapStateToProps, {getSession})(ViewDevelopers)
