import React, { Component } from 'react';
import axios from "axios"
import style from "./FindProject.module.scss"
import {Link} from "react-router-dom"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {getSession} from "../../../redux/ducks/auth"
import {Button} from "react-bootstrap"


class FindProject extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      redirect: false
    }
  }

  componentDidMount() {
    this.props.getSession().then(result => {
      
      if(!this.props.auth.id){
        this.setState({
          redirect: true
        })
      }
    });
    this.displayProjects();
  }

  displayProjects = () => {
    axios
      .get(`/api/displayprojects`)
      .then(res => {
        this.setState({
          projects: res.data,
          
        })
        console.log(res.data)
      })
      .catch(err => {
        console.log(`Something went wrong with displayProjects ${err}`)
      })
  }
  render() {
    if(this.state.redirect) {
      return <Redirect to='/login' />
    }
    const list = this.state.projects.map((element, index) => {
      return (
        <div  key = {index} className = {style.Card}  >
          <img  src= {element.charimg} />
          <h3 className = {style.Title}>{element.title.length < 40 ? `${element.title}` : `${element.title.substring(0,40)}...`}</h3>
        
          <h5 className = {style.Skills}><span>Skills Required: </span>{element.skills_req.length <35 ? `${element.skills_req}` : `${element.skills_req.substring(0,45)}...`}</h5>
          {element.num_dev == 1 ? <h5>{element.num_dev} developer needed for this project</h5>
          :<h5 className = {style.NumDev}>{element.num_dev} developers needed for this project</h5>}
          
          <Link to ={{ pathname: `/dev/findproject/${element.project_id}`}}>
            <Button variant="primary" type="submit" className = {style.Button}>
              View
            </Button>
          </Link>
        </div>
      )
    })
    
    return (
      <div className = {style.Body}>
        {list}
      </div>


    );

  }
}

const mapStateToProps = (Reduxstate) => Reduxstate
export default connect(mapStateToProps, {getSession})(FindProject);

