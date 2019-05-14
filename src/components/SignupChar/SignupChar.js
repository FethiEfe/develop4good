import React, { Component } from "react"
import { Form, Button } from "react-bootstrap"
import style from "./SignupChar.module.scss"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import axios from "axios"


class SignupChar extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            password: "",
            getError: undefined,
            isSignedUp: false,
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
        axios
        .post("/auth/signupchar", { username, email, password })
        .then(result => {
            this.setState({
                isSignedUp: true,
                getError: undefined,
            })
        })
        .catch(err => {
            this.setState({
                getError: true
            })
        })
    }

    render() {
        console.log(this.props.auth.id)
        return (
           
                <div className = {style.Body}>
                    <Form className={style.Form} onSubmit = {this.handleSubmit}>
                        <h2 style ={{textAlign: "center"}}>Increase effectiveness and efficiency through us!</h2>
                        <Form.Group controlId="formBasicEmail" id = "label-username">
                        <label style ={{display: "block", color: "black"}}>Username</label>
                            <Form.Control type="text"
                                placeholder="Enter username"
                                onChange={this.handleChange}
                                name="username"
                                value={this.state.username} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                        <label style ={{display: "block", color: "black"}}>Email</label>
                            <Form.Control type="email"
                                placeholder="Enter email"
                                onChange={this.handleChange}
                                name="email"
                                value={this.state.email}
                                required />
                                <Form.Text className="text-muted">
                                     We'll never share your email with anyone else.
                                </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                        <label style ={{display: "block", color: "black"}}>Password</label>
                            <Form.Control type="password"
                                placeholder="Password"
                                onChange={this.handleChange}
                                name="password"
                                value={this.state.password} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Signup
                        </Button>
                        {this.state.getError ? <h5>Username is taken</h5> : null}
                        <br />
                        {this.state.isSignedUp ? <Link to="/login">You successfully signed up. Click to Login </Link> : null}
                    </Form>
                    
                </div>
            

        )
    }
}
const mapStateToProps = Reduxstate => Reduxstate
export default connect(mapStateToProps)(SignupChar);
