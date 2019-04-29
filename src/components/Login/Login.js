import React, { Component } from 'react';
import style from "./Login.module.scss"
import {Form, Button} from "react-bootstrap"
class Login extends Component {
    state = {
      email: "",
      password: ""
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }


    handleSubmit = (e) => {
      e.preventDefault();
    }

  render() {

    return (
      <div className={style.Login}>

        <Form onSubmit = {this.state.onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"  
                                       name = "email"
                                       value = {this.state.email}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" 
                                          name = "password"
                                          value = {this.state.password}/>
          </Form.Group>

          <div className={style.Buttons}>

            <Button variant="primary" type="submit">
              Login
            </Button>
            <Button variant="primary" type="submit">
              Signup
            </Button>

          </div>

          
      
        </Form>

      </div>
    );

  }
}

export default Login;