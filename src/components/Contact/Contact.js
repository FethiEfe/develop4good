import React, { Component } from 'react';
import style from "./Contact.module.scss";
import { Form, Row, Col, Button } from "react-bootstrap"

class Contact extends Component {
  render() {

    return (
      <div className={style.Contact}>
        <Form className={style.Form} >
          <div >

            <Row>
              <Col>
                <Form.Control placeholder="First name" />
              </Col>
              <Col>
                <Form.Control placeholder="Last name" />
              </Col>
            </Row>

          </div>


          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>



          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" placeholder="Tell us what do you think" rows="3" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );

  }
}

export default Contact;