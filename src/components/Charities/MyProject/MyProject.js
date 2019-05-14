import React, { Component } from 'react'
import { connect } from "react-redux"
import axios from "axios"
import style from "./MyProject.module.scss"
import { Link, Redirect } from "react-router-dom"
import {Button} from "react-bootstrap"
import {getSession} from "../../../redux/ducks/auth"


class MyProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            char_id: this.props.auth.char_id,
            myProjects: [],
            redirect: false,

        }

    }
    componentDidMount() {
        this.props.getSession()
        .then(result => {
         
            this.setState({
                char_id: result.value.data.char_id 
            }, () => {this.getCharProject()})
            if (!this.props.auth.char_id) {
                this.setState({
                    redirect: true
                })
            }
        })
        
       
    }

    getCharProject = () => {
        const { char_id } = this.state
        axios
            .get(`/char/myprojects/${char_id}`)
            .then(result => {
                this.setState({
                    myProjects: result.data
                })
            })
            .catch(err => {
                console.log(`Something went wrong at getCharProject ${err}`)
            })

    }

    deleteProject = (project_id) => {
        
        
        axios
            .delete(`/char/deleteproject/${project_id}`)
            .then(() => {
                this.getCharProject();
            }
            )
            .catch(err => {
                console.log(`Something went wrong at Delete Project ${err}`)
            })
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to='/login' />
        }
        
        const { char_id } = this.state
        const project = this.state.myProjects.map((project, index) => {
            return (
                <div key={index} className={style.Card}>

                    <img src={project.charimg} />
                    <h3 className={style.Title}>{project.title.length < 40 ? `${project.title}` : `${project.title.substring(0, 40)}...`}</h3>
                    <h5 className={style.Skills}><span>Skills Required: </span>{project.skills_req.length < 35 ? `${project.skills_req}` : `${project.skills_req.substring(0, 45)}...`}</h5>
                    {project.num_dev == 1 ? <h5 className={style.NumDev}>{project.num_dev} developer needed for this project</h5>
                        : <h5 className={style.NumDev}>{project.num_dev} developers needed for this project</h5>}
                    <Link to={`/char/myprojects/${project.project_id}/${char_id}`}>
                        <a className={style.Button}>Click to see who is interested in your project</a>
                    </Link>
                    <Button variant="primary" type="submit" className={style.Button} onClick  = {() => this.deleteProject(project.project_id)}>
                       Delete Project
                    </Button>


                </div>
            )
        })
        return (
            <div className={style.Body}>
            {(this.state.myProjects.length === 0) ? <h2 style = {{marginTop : "20vh", color: "red"}}>You have not posted any project yet!</h2> :   project}
                
                    
               

            </div>
        )
    }
}
const mapStateToProps = Reduxstate => Reduxstate
export default connect(mapStateToProps, {getSession})(MyProject)