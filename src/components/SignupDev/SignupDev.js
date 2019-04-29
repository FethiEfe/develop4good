import React, { Component } from "react"
import { Form, Button } from "react-bootstrap"
import style from "./SignupDev.module.scss"
import axios from "axios"
import { connect } from "react-redux"
import { signupDev } from "../../redux/ducks/auth"

class SignupDev extends Component {

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
        this.props.signupDev(username, email, password)
    }

    render() {
        return (
            <div>
                <div>Developer Lorem ipsum</div>
                <Form className={style.Form} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type=""
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
const mapStateToProps = Reduxstate => Reduxstate


export default connect(mapStateToProps, { signupDev })(SignupDev)