import React, { Component } from "react"
import { Form, Button } from "react-bootstrap"
import style from "./SignupDev.module.scss"
import axios from "axios"

class SignupDev extends Component {

    constructor(){
        super();
        this.state ={
            username: "",
            password: "",
        }
    }

    handleChange = (e) => {
        console.log(e.target.value)
      this.setState({
          [e.target.name] : e.target.value
      })
    }

    handleSubmit = (e) => {
        const {username, password} = this.state
        axios
        .post("/api/signupdev", {username, password})
        .then(res => {
            console.log(res.data)
        })

    }

    render() {
        return (
            <div>
            <div>Developer Lorem ipsum</div>
            <Form className = {style.Form}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="email" 
                                  placeholder="Enter username" 
                                  onChange = {this.handleChange}
                                  name = "username"
                                  value = {this.state.username}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" 
                                  placeholder="Password"
                                  onChange = {this.handleChange}
                                  name = "password"
                                  value = {this.state.password} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Signup
                </Button>
            </Form>

            </div>

            
        )
    }
}

export default SignupDev