import React, { Component } from 'react';
import style from "./Contact.module.scss";
import { Form, Row, Col, Button } from "react-bootstrap"
import axios from "axios"
import {Redirect} from "react-router-dom"

class Contact extends Component {
  constructor(){
    super();
    this.state = {
      name: "",
      email: "",
      message: "",
      subject: "",
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {name, email, message, subject} = this.state
    axios
    .post(`/api/contact`, {name, email, message, subject})
    .then(() => {
      alert("Sent")
    })
    
  }
  

  render() {

    return (
      <div className={style.Contact}>
        <Form className={style.Form} onSubmit = {this.handleSubmit}>
          

            <Row>
              <Col>
                <label className = {style.MailLables}>Full Name:</label>
                <Form.Control placeholder="" 
                              name = "name"
                              value = {this.state.name}
                              onChange = {this.handleChange}/>
              </Col>
            </Row>


            <Row>
              <Col>
                <label  className = {style.MailLables}>Subject:</label>
                <Form.Control placeholder="" 
                              name = "subject"
                              value = {this.state.subject}
                              onChange = {this.handleChange}/>
              </Col>
            </Row>


          <Form.Group controlId="exampleForm.ControlInput1">
            <label  className = {style.MailLables}>Email address:</label>
            <Form.Control type="email" 
                          placeholder=""
                          name = "email"
                          value = {this.state.email}
                          onChange = {this.handleChange} />
          </Form.Group>



          <Form.Group controlId="exampleForm.ControlTextarea1">
            <label  className = {style.MailLables}>Your Message:</label>
            <Form.Control as="textarea" 
                          placeholder="" 
                          rows="3" 
                          name ="message"
                          value = {this.state.message}
                          onChange = {this.handleChange}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Send
          </Button>
        </Form>
      </div>
    );

  }
}

export default Contact;