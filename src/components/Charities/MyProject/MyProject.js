import React, { Component } from 'react'
import { connect } from "react-redux"
import axios from "axios"
import style from "./MyProject.module.scss"
import {Link} from "react-router-dom"


class MyProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            char_id: this.props.auth.char_id,
            myProjects: [],
           
        }

    }
    componentDidMount() {
        this.getCharProject();
    }
    getCharProject = () => {
        const { char_id } = this.state
        axios
            .get(`/char/myprojects/${char_id}`)
            .then(result => {
                this.setState({
                myProjects : result.data
                })
            })
            .catch(err => {
                console.log(`Something went wrong at getCharProject ${err}`)
            })

    }

   
    render() {
        const { char_id } = this.state
        const project = this.state.myProjects.map((project, index) => {
            return (
                <div key={index} className= {style.Card}>

                    <img src={project.charimg} />
                    <h1>{project.nameoforganization}</h1>
                    <h3>{project.title}</h3>
                    <h3>Skills: {project.skills_req}</h3>
                    <Link to={`/char/myprojects/${project.project_id}/${char_id}`}>
                        <a>Click to see developers that applied to your project</a>
                    </Link>


                </div>
            )
        })
        return (
            <div className = {style.Body}>
               {project}
               
            </div>
        )
    }
}
const mapStateToProps = Reduxstate => Reduxstate
export default connect(mapStateToProps)(MyProject)