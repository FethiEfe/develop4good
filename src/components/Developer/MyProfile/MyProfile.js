import React, { Component } from 'react';
import { Form, Col,  Button } from "react-bootstrap"
import style from "./MyProfile.module.scss"
import { connect } from "react-redux"
import { updateMyProfileInfo, getDevProfilePic,getSession} from "../../../redux/ducks/auth"
import axios from "axios"
import {Redirect} from "react-router-dom"



class MyProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {

      first_name: props.auth.first_name,
      last_name: props.auth.last_name,
      email: props.auth.email,
      linkedin: props.auth.linkedin,
      skills: props.auth.skills,
      img: props.auth.img,
      file: null,
      redirect: false
    }
  }

  componentDidMount(){
    
    this.props.getSession()
    .then((result) => {
     
      this.setState({
        first_name: result.value.data.first_name,
        last_name: result.value.data.last_name,
        email: result.value.data.email,
        linkedin: result.value.data.linkedin,
        skills: result.value.data.skills,
        img: result.value.data.img
      })
      
      if(!this.props.auth.id){
        this.setState({
          redirect: true
        })
      }
    });
  }

  handleChange = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    const { first_name, last_name, email, linkedin, skills } = this.state
    const { id } = this.props.auth
    e.preventDefault();
    this.props.updateMyProfileInfo(id, first_name, last_name, email, linkedin, skills).then(() => {
      alert("You successfully updated your profile")
    });
    
  }
  
  handleFileUpload = (event) => {
    
    this.setState({file: event.target.files});
  }


  uploadPic = (event) => {
    if(!this.state.file){alert("You didn't choose a file. Please click on picture to upload one and hit Upload button")}
    else {
      const { id } = this.props.auth;
      event.preventDefault();
      const formData = new FormData();
      formData.append('file', this.state.file[0]);
      axios.put(`/api/updateprofilepic/${id}`, formData, { id,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        this.setState({img: response.data.Location})
        this.props.getDevProfilePic(id)
      }).catch(error => {
        console.log(error)
      });

    }
    
   
  }



  render() {
    
    if(this.state.redirect) {
      return <Redirect to='/login' />
    }
    return (
      <div className={style.MyProfile}>
          <div className={style.Image}>

            <img src={this.state.img}
                 onClick = {() => this.fileInput.click()} 
                 alt =""/>
            <input type="file" 
                   onChange={this.handleFileUpload} 
                   style = {{display : "none"}}
                   ref ={fileInput => this.fileInput = fileInput}/>
            <div className ={style.Text}>Click on picture to edit and hit upload button</div>
            
              <Button variant="primary" type="submit" onClick={this.uploadPic} className = {style.UploadButton} >
                  Upload
              </Button>
             
            
            

          </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Col>
              <Form.Control placeholder="First Name"
                name="first_name"
                value={this.state.first_name}
                onChange={this.handleChange}
                required />
            </Col>
            <Col>
              <Form.Control placeholder="Last name"
                name="last_name"
                value={this.state.last_name}
                onChange={this.handleChange}
                required />
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Control placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required />
            </Col>
            <Col>
              <Form.Control 
                
                placeholder="Linkedin"
                name="linkedin"
                value={this.state.linkedin}
                onChange={this.handleChange}
                required />
            </Col>
          </Form.Row>

          <Form.Control size="lg" type="text"
            placeholder="Tell us about your skills like Javascript, React"
            name="skills"
            value={this.state.skills}
            onChange={this.handleChange}
            className = {style.Skills}
            required
          />

          <Button variant="primary" type="submit">
            Submit
          </Button>

        </Form>

      </div >


    );

  }
}
const mapStateToProps = (reduxstate) => {

 return reduxstate
}
export default connect(mapStateToProps, { updateMyProfileInfo, getDevProfilePic,getSession })(MyProfile);