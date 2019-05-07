import React, { Component } from 'react';
import { connect } from "react-redux"
import axios from "axios"
import style from "./AppliedProject.module.scss"
import { Link } from "react-router-dom"


class AppliedProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dev_id: this.props.auth.id,
      applied_projects: []
    }
  }

  componentDidMount(){
    this.appliedProject();
  }


  appliedProject = () => {
    const { dev_id } = this.state
    axios
      .get(`/dev/appliedprojects/${dev_id}`)
      .then(result => {
        console.log(result.data)
        this.setState({
          applied_projects: result.data
        })
      })
      .catch(err => {
        console.log(`Something wrong ar applied projects ${err}`)
      })
  }

  withdrawalProject = (project_id) => {
    axios
    .delete(`/dev/deleteproject/${project_id}`)
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
    const list = this.state.applied_projects.map((project, index) => {
      return (
        <div key={index} className={style.Card}>

          <img src={project.charimg} />
          <h1>{project.nameoforganization}</h1>
          <h3>{project.title}</h3>
          <h3>Skills: {project.skills_req}</h3>
          <div>
            <Link to={`/dev/appliedproject/${project.project_id}`}>
              <button>View</button>
            </Link>

            <button onClick={() => this.withdrawalProject(project.project_id)}>Withdrawal</button>

          </div>

        </div>
      )
    })
    return (
      <div className={style.Body}>
        {list}
      </div>


    );

  }
}
const mapStateToProps = Reduxstate => Reduxstate
export default connect(mapStateToProps)(AppliedProject);