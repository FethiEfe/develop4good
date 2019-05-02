import React, { Component } from 'react';
import { Form, Col, Container, Image, ButtonToolbar, Button } from "react-bootstrap"
import style from "./MyProfile.module.scss"
import { connect } from "react-redux"
import { updateMyProfileInfo} from "../../../redux/ducks/auth"
import axios from "axios"



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
      file: null
    }
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
    this.props.updateMyProfileInfo(id, first_name, last_name, email, linkedin, skills)
  }
  
  handleFileUpload = (event) => {
    
    this.setState({file: event.target.files});
  }


  uploadPic = (event) => {
    const { id } = this.props.auth;
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file[0]);
    axios.post(`/api/updateprofilepic/${id}`, formData, { id,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response)
      this.setState({img: response.data.Location})
    }).catch(error => {
      console.log(error)
    });
   
  }



  render() {

    return (
      <div className={style.MyProfile}>
          <div>

            <img src={this.state.img} />
            <input type="file" onChange={this.handleFileUpload} />
            <button onClick={this.uploadPic} >Upload</button>

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
              <Form.Control placeholder="Linkedin"
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
const mapStateToProps = (Reduxstate) => Reduxstate
export default connect(mapStateToProps, { updateMyProfileInfo })(MyProfile);