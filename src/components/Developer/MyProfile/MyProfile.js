import React, { Component } from 'react';
import { Form, Col, Container, Image, ButtonToolbar, Button } from "react-bootstrap"
import pic from "./random.jpg"
import style from "./MyProfile.module.scss"
import {connect} from "react-redux"
import {updateMyProfileInfo} from "../../../redux/ducks/developerReducer"

class MyProfile extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      img: "",
      email: "",
      linkedin: "",
      skills: ""
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    const {first_name, last_name, email, linkedin, skills} = this.state
    const {id} = this.props.auth
    e.preventDefault();
    this.props.updateMyProfileInfo(id, first_name, last_name, email, linkedin, skills)
  }


  render() {
    return (
      <div className={style.MyProfile}>


        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Col>
              <Form.Control placeholder="First name"
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
export default connect(mapStateToProps, {updateMyProfileInfo}) (MyProfile);