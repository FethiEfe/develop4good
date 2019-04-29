import React, { Component } from 'react';
import { Form, Col, Container, Image, ButtonToolbar, Button } from "react-bootstrap"
import pic from "./random.jpg"
import style from "./MyProfile.module.scss"

class MyProfile extends Component {
  constructor(){
    super();
    this.state = {
      first_name: "",
      last_name: "" ,
      img: "",
      email: "",
      linkedin: "",
      skills: ""
    }
  }
  render() {

    return (
      <div className={style.MyProfile}>
       
        <Image src={pic} thumbnail />
        <Form>
          <Form.Row>
            <Col>
              <Form.Control placeholder="First name" />
            </Col>
            <Col>
              <Form.Control placeholder="Last name" />
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Control placeholder="Email" />
            </Col>
            <Col>
              <Form.Control placeholder="Linkedin" />
            </Col>
          </Form.Row>

          <Form.Control size="lg" type="text" placeholder="Tell us about your skills like Javascript, React" />

          <ButtonToolbar>

            <Button variant="success">Update</Button>

          </ButtonToolbar>

        </Form>

      </div >


    );

  }
}

export default MyProfile;