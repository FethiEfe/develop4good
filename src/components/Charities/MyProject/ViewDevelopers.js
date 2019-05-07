import React,{Component} from 'react'
import axios from "axios"

class ViewDevelopers extends Component{
    constructor(){
        super();
        this.state ={
            numDevInterested : []
        }
    }
    componentDidMount(){
        const project_id = this.props.match.params.project_id
        this.getInterestedDevNum(project_id);
    }

    getInterestedDevNum = (project_id) => {
        axios
        .get(`/char/getdevnumint/${project_id}`)
        .then(result => {
            this.setState({
            numDevInterested : result.data
            })
            
        })
        .catch(err => {
            console.log(err)
        })
    }


    render(){
        const developer = this.state.numDevInterested.map((developer, index) => {
            return(
                <div key = {index}>
                    <img src = {developer.img}/>
                    <h3>{developer.first_name} {developer.last_name}</h3>
                    <h3>{developer.skills}</h3>
                    <h3>{developer.linkedin}</h3>
                    <h3>{developer.email}</h3>
                </div>
            )
        })
        return(
            <div>
                
                    {developer}
                
            </div>
        )
    }
}
export default ViewDevelopers