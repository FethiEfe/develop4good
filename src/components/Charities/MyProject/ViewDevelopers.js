import React,{Component} from 'react'
import axios from "axios"
import style from "./ViewDevelopers.module.scss"
import {Link} from "react-router-dom"

class ViewDevelopers extends Component{
    constructor(){
        super();
        this.state ={
            numDevInterested : []
        }
    }
    componentDidMount(){
        const project_id = this.props.match.params.project_id
        this.getInterestedDevNum(project_id);
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
        const developer = this.state.numDevInterested.map((developer, index) => {
            return(
                <div key = {index} className = {style.Card}>
                    <img src = {developer.img} className ={style.Image}/>
                    <h3 style ={{textAlign: "center"}}>{developer.first_name} {developer.last_name}</h3>
                    <h3 style ={{textAlign: "center"}}><span>Skills: </span>{developer.skills}</h3>
                    <h3 style ={{textAlign: "center"}}><span>Linkedin: </span>{developer.linkedin}</h3>
                    
                    <h3 style ={{textAlign: "center"}}><span>Email: </span>{developer.email}</h3>
                </div>
            )
        })
        return(
            <div className ={style.Body}>
                
                    {developer}
                
            </div>
        )
    }
}
export default ViewDevelopers