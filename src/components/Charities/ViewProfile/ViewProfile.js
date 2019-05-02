import React, { Component } from "react"
import { Form, Col, Button } from "react-bootstrap"
import style from "./ViewProfile.module.scss"
import {connect} from "react-redux";
import {updateCharProfileInfo} from "../../../redux/ducks/auth"

class ViewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameOfOrganization : props.auth.nameOfOrganization,
            website: props.auth.website,
            email: props.auth.charemail,
            charLinkedin: props.auth.charLinkedin,
            mission:props.auth.mission,
            charimg:props.auth.charimg,


        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) => {
        const {char_id} = this.props.auth
        const {nameOfOrganization, website, email, charLinkedin, mission} =this.state
        e.preventDefault();
        this.props.updateCharProfileInfo(char_id, nameOfOrganization, website, email, charLinkedin, mission)
    }

    render() {
        return (
            <div className = {style.ViewProfile}>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Col>
                            <Form.Control placeholder=" Name of Organization"
                                name="nameOfOrganization"
                                value={this.state.nameOfOrganization}
                                onChange={this.handleChange}
                                required />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Website address"
                                name="website"
                                value={this.state.website}
                                onChange={this.handleChange}
                                required />
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col>
                            <Form.Control placeholder="Email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                required />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Linkedin"
                                name="charLinkedin"
                                value={this.state.charLinkedin}
                                onChange={this.handleChange}
                                required />
                        </Col>
                    </Form.Row>

                    <Form.Control size="lg" type="text"
                        placeholder="Mission"
                        name="mission"
                        value={this.state.mission}
                        onChange={this.handleChange}
                        required
                    />

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>

                </Form>
            </div>
        )
    }
}
const mapStateToProps = (Reduxstate) => Reduxstate
export default connect(mapStateToProps, {updateCharProfileInfo})(ViewProfile)