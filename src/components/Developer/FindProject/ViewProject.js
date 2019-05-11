import React, {Component} from "react";
import axios from "axios";
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {getSession} from "../../../redux/ducks/auth"
import style from "./ViewProject.module.scss"
import {Button} from "react-bootstrap"


 class ViewProject extends Component {
    constructor(props){
        super(props);
        this.state = {
        list : [],
        dev_id :  this.props.auth.id,
        redirect: false

        }
    }

    componentDidMount(){
        const{id} = this.props.match.params
        const project_id = id
        this.displayProject(project_id)
        this.props.getSession().then(result => {
      
            if(!this.props.auth.id){
              this.setState({
                redirect: true
              })
            }
          });
      
        
    }

    displayProject = (project_id) => {
        axios
        .get(`/dev/displayprojects/${project_id}`)
        .then(result => {
          
            this.setState({
                
                list : result.data
            })
        })
        .catch(err => {
            console.log(`Something went wrong at display project ${err}`)
        })
    }

    applyProject = () => {
        const {char_id} = this.state.list
        const {dev_id} = this.state
        const{id} = this.props.match.params
        const project_id = id
        axios
        .post(`/api/applyproject/${dev_id}/${project_id}/${char_id}`)
        .then(response =>{
            alert(`You succesfully applied this project. Charity organization will reach you out soon`)
        })
        .catch(err => {
            console.log(`Something went wrong at apply Project ${err}`)
            alert("You have already applied to this project ")
        })
    }
    render(){
      const {list} = this.state;
      if(this.state.redirect) {
        return <Redirect to='/login' />
      }
        return(
            <div className ={style.Body}>
                <img src = {list.charimg} className ={style.Image}/>
                <h1 className ={style.NameOfOrganization}>{list.nameoforganization}</h1>
                <h3>Our Mission:</h3>
                <p className ={style.Mission}>{list.mission}</p>
                <h3 className ={style.Title}>{list.title}</h3>
                <h3>Required Skills:</h3>
                <h4 className ={style.Skills}>{list.skills_req}</h4>
                <p className ={style.Text}>{list.text}</p>
                <h4 className ={style.NumDev}>{list.num_dev} Developers needed</h4>
                <h6 className ={style.Website}>{list.website}</h6>
                <h6 className ={style.Email}>{list.email}</h6>
                <h6 className ={style.Linkedin}>{list.charlinkedin}</h6>

                <Button variant="primary" type="submit" className = {style.ApplyButton} onClick = {this.applyProject} >
                Apply
            </Button>
                {/* <button onClick = {this.applyProject} className ={style.ApplyButton}>Apply</button> */}

            </div>
        )
    }
}

const mapStateToProps = (Reduxstate) => Reduxstate
export default connect(mapStateToProps, {getSession})(ViewProject)