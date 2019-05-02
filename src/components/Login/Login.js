import React, { Component } from 'react';
import style from "./Login.module.scss"
import { Form, Button } from "react-bootstrap"
import {connect} from "react-redux"
import {login} from "../../redux/ducks/auth"

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    }
  }

  handleChange = (e) => {
    
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  handleSubmit = (e) => {
   
    const {username, password} = this.state
    e.preventDefault();
    this.props.login(username, password)
    
  }

  render() {
    
    return (
      <div className={style.Login}>

        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Enter Username</Form.Label>
            <Form.Control type="username" placeholder="Enter username"
              name="username"
              value={this.state.username} 
              onChange = {this.handleChange}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"
              name="password"
              value={this.state.password} 
              onChange = {this.handleChange}/>
          </Form.Group>

          <div className={style.Buttons}>

            <Button variant="primary" type="submit" >
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

const mapStateToProps = Reduxstate => Reduxstate

export default  connect (mapStateToProps, {login})(Login);