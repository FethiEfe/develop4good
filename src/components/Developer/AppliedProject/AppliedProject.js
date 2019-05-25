import React, { Component } from 'react';
import { connect } from "react-redux"
import axios from "axios"
import style from "./AppliedProject.module.scss"
import { Link, Redirect } from "react-router-dom"
import {getSession} from "../../../redux/ducks/auth"
import {Button} from "react-bootstrap"


class AppliedProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dev_id: props.auth.id,
      applied_projects: [],
      redirect: false
    }
  }

  componentDidMount(){
    this.props.getSession().then(() => {
      this.setState({
        dev_id: this.props.auth.id
      }, () => {
        this.appliedProject();
      })
      if(!this.props.auth.id){
        this.setState({
          redirect: true
        })
      }
    });
  }


  appliedProject = () => {
    const { dev_id } = this.state
    axios
      .get(`/dev/appliedprojects/${dev_id}`)
      .then(result => {
        
        this.setState({
          applied_projects: result.data
        })
      })
      .catch(err => {
        console.log(`Something wrong ar applied projects ${err}`)
      })
  }

  withdrawalProject = (project_id) => {
    const { dev_id } = this.state
    axios
    .delete(`/dev/deleteproject/${project_id}/${dev_id}`)
    .then(result => {
      console.log(result.data)
    })
    .catch(err => {
      console.log(`Something went wrong at withdrawalProject ${err}`)
    })
    alert(`You are not interested in this project anymore`)
    this.appliedProject();
  }

  render() {
  
    if(this.state.redirect) {
      return <Redirect to='/login' />
    }
    const list = this.state.applied_projects.map((project, index) => {
      return (
        <div key={index} className={style.Card}>

          <img src={project.charimg} />
          <h3 className = {style.Title}>{project.title.length < 40 ? `${project.title}` : `${project.title.substring(0,40)}...`}</h3>
          <h5 className = {style.Skills}><span>Skills Required: </span>{project.skills_req.length <35 ? `${project.skills_req}` : `${project.skills_req.substring(0,45)}...`}</h5>
          {project.num_dev == 1 ? <h5>{project.num_dev} developer needed for this project</h5>
          :<h5 className = {style.NumDev}>{project.num_dev} developers needed for this project</h5>}
          <div className = {style.Buttons}>
            <Link to={`/dev/appliedproject/${project.project_id}`}>
              <Button variant="primary" type="submit" className = {style.Button1}>
                View
              </Button>
            </Link>

            <Button onClick={() => this.withdrawalProject(project.project_id)} className = {style.Button1}>Withdrawal</Button>

          </div>

        </div>
      )
    })
    return (
      <div className={style.Body}>
        {(this.state.applied_projects.length === 0) ? <h2 style = {{marginTop : "20vh", color: "red"}}>You have not applied to any project yet</h2> :   list}
        
      </div>


    );

  }
}
const mapStateToProps = Reduxstate => Reduxstate
export default connect(mapStateToProps, {getSession})(AppliedProject);