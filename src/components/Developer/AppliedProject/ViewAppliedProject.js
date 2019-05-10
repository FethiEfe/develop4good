import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom'
import { getSession } from "../../../redux/ducks/auth"
import { connect } from "react-redux"
import style from "./ViewAppliedProject.module.scss"


class ViewAppliedProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: [],
            redirect: false


        }
    }

    componentDidMount() {
        const { id } = this.props.match.params
        const project_id = id
        this.props.getSession().then(result => {

            if (!this.props.auth.id) {
                this.setState({
                    redirect: true
                })
            }
        });
        this.displayProject(project_id)


    }

    displayProject = (project_id) => {
        axios
            .get(`/dev/displayprojects/${project_id}`)
            .then(result => {

                this.setState({

                    project: result.data
                })
            })
            .catch(err => {
                console.log(`Something went wrong at display project ${err}`)
            })
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to='/login' />
        }
        const { project } = this.state

        return (
            <div className ={style.Body}>

                <img src = {project.charimg} className ={style.Image}/>
                <h1 className={style.NameOfOrganization}>{project.nameoforganization}</h1>
                <h3>Our Mission:</h3>
                <p className={style.Mission}>{project.mission}</p>
                <h3 className={style.Title}>{project.title}</h3>
                <h3>Required Skills:</h3>
                <h4 className={style.Skills}>{project.skills_req}</h4>
                <p className={style.Text}>{project.text}</p>
                <h4 className={style.NumDev}>{project.num_dev} Developers needed</h4>
                <h6 className={style.Website}>{project.website}</h6>
                <h6 className={style.Email}>{project.email}</h6>
                <h6 className={style.Linkedin}>{project.charlinkedin}</h6>
                <h4 style ={{color: "green"}}>You applied this project</h4>
               
            </div>
        )
    }
}

const mapStateToProps = Reduxstate => Reduxstate
export default connect(mapStateToProps, { getSession })(ViewAppliedProject)
