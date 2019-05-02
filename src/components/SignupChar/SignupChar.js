import React, { Component } from "react"
import { Form, Button } from "react-bootstrap"
import style from "./SignupChar.module.scss"
import {connect} from "react-redux"
import {signupChar} from "../../redux/ducks/auth"

class SignupChar extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            password: "",
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        
        e.preventDefault();
        const { username, email, password } = this.state
        this.props.signupChar(username, email, password)
    }

    render() {
        return (
            <div>
                <div>Char Lorem Ipsum</div>
                <Form className={style.Form} onSubmit = {this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text"
                            placeholder="Enter username"
                            onChange={this.handleChange}
                            name="username"
                            value={this.state.username} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"
                            placeholder="Enter email"
                            onChange={this.handleChange}
                            name="email"
                            value={this.state.email}
                            required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Password"
                            onChange={this.handleChange}
                            name="password"
                            value={this.state.password} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Signup
                    </Button>
                </Form>
            </div>



        )
    }
}
const mapStateToPros = Reduxstate => Reduxstate
export default connect(mapStateToPros, {signupChar})(SignupChar)