import React, {Component} from "react";
import axios from "axios";
import {connect} from "react-redux"

 class ViewProject extends Component {
    constructor(props){
        super(props);
        this.state = {
        list : [],
        dev_id :  this.props.auth.id

        }
    }

    componentDidMount(){
        const{id} = this.props.match.params
        const project_id = id
        this.displayProject(project_id)
      
        
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
        })
    }
    render(){
      const {list} = this.state
        return(
            <div>
                <img src = {list.charimg}/>
                <h1>{list.nameoforganization}</h1>
                <h2>Our Mission:</h2>
                <h3>{list.mission}</h3>
                <h3>{list.title}</h3>
                <h3>{list.num_dev} Developers needed</h3>
                <h2>Required Skills:</h2>
                <h3>{list.skills_req}</h3>
                <p>{list.text}</p>
                <h5>{list.website}</h5>
                <h5>{list.email}</h5>
                <h5>{list.charlinkedin}</h5>
                <button onClick = {this.applyProject}>Apply</button>

            </div>
        )
    }
}

const mapStateToProps = (Reduxstate) => Reduxstate
export default connect(mapStateToProps)(ViewProject)