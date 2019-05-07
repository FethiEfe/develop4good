import React, { Component } from "react";
import axios from "axios";


class ViewAppliedProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: [],


        }
    }

    componentDidMount() {
        const { id } = this.props.match.params
        const project_id = id
        console.log(project_id)
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

        const { project } = this.state

        return (
            <div>
                <img src = {project.charimg}/>
                <h1>{project.nameoforganization}</h1>
                <h2>Our Mission:</h2>
                <h3>{project.mission}</h3>
                <h3>{project.title}</h3>
                <h3>{project.num_dev} Developers needed</h3>
                <h2>Required Skills:</h2>
                <h3>{project.skills_req}</h3>
                <p>{project.text}</p>
                <h5>{project.website}</h5>
                <h5>{project.email}</h5>
                <h5>{project.charlinkedin}</h5>
                <h3>You applied this project</h3>
                

            </div>
        )
    }
}


export default ViewAppliedProject