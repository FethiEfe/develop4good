import React, { Component } from 'react';
import axios from "axios"
import style from "./FindProject.module.scss"
import {Link} from "react-router-dom"
import ViewProject from "./ViewProject"


class FindProject extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    this.displayProjects();
  }

  displayProjects = () => {
    axios
      .get(`/api/displayprojects`)
      .then(res => {
        this.setState({
          projects: res.data
        })
      })
      .catch(err => {
        console.log(`Something went wrong with displayProjects ${err}`)
      })
  }
  render() {
    const list = this.state.projects.map((element, index) => {
      return (
        <div  key = {index} className = {style.Card}  >
          <img  src= {element.charimg} />
          <h3>{element.title.length < 20 ? `${element.title}` : `${element.title.substring(0,25)}...`}</h3>
          <h3>{element.skills_req.length <20 ? `${element.skills_req}` : `${element.skills_req.substring(0,25)}...`}</h3>
          <Link to ={{ pathname: `/dev/findproject/${element.project_id}`}}>
            <button>View</button>
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

export default FindProject;