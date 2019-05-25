import React, { Component } from 'react';
import style from "./Login.module.scss"
import { Form, Button } from "react-bootstrap"
import {connect} from "react-redux"
import {login} from "../../redux/ducks/auth"
import {Link, Redirect} from "react-router-dom"

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      getError: false,
      redirect: false
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
    .then(result => {
      this.setState({
        getError: false,
        redirect: true
      })
      
    })
    .catch(err => {
      this.setState({
        getError: true
      })
    })
    
    
  }

  render() {
      if(this.state.redirect) {
        return <Redirect to ="/" />
      }
    return (
      <div className={style.Login}>

        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <label className = {style.LoginLabel}>Enter Username</label>
            <Form.Control type="username" placeholder="Enter username"
              name="username"
              value={this.state.username} 
              onChange = {this.handleChange}/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <label className = {style.LoginLabel}>Password</label>
            <Form.Control type="password" placeholder="Password"
              name="password"
              value={this.state.password} 
              onChange = {this.handleChange}/>
          </Form.Group>
          {this.state.getError ? <h3 className = {style.loginError}>Username or password is wrong</h3>: null}
          <div className={style.Buttons}>
        
              <Button variant="primary" type="submit" >Login</Button>
         


          </div>

            <Link to = "/" >You don't have an account yet. Click here to sign up</Link>


        </Form>

      </div>
    );

  }
}

const mapStateToProps = Reduxstate => Reduxstate

export default  connect (mapStateToProps, {login})(Login);