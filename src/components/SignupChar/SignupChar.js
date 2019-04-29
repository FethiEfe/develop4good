import React, { Component } from "react"
import { Form, Button } from "react-bootstrap"
import style from "./SignupChar.module.scss"

class SignupChar extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
        }
    }

    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <div>Char Lorem Ipsum</div>
                <Form className={style.Form}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="email"
                            placeholder="Enter username"
                            onChange={this.handleChange}
                            name="username"
                            value={this.state.username} />
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

export default SignupChar