import React, { Component } from "react"
import { Form, Col, Button } from "react-bootstrap"
import style from "./ViewProfile.module.scss"
import { connect } from "react-redux";
import { updateCharProfileInfo, getCharProfilePic } from "../../../redux/ducks/auth"
import axios from "axios"
import {Redirect} from "react-router-dom"

class ViewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameOfOrganization: props.auth.nameOfOrganization,
            website: props.auth.website,
            email: props.auth.charemail,
            charLinkedin: props.auth.charLinkedin,
            mission: props.auth.mission,
            charimg: props.auth.charimg,
            file: null,
            redirect: false,


        }
    }
    componentDidMount(){
        if(!this.props.auth.username){
            this.setState({
              redirect: true
            })
          }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        const { char_id } = this.props.auth
        const { nameOfOrganization, website, email, charLinkedin, mission } = this.state
        e.preventDefault();
        this.props.updateCharProfileInfo(char_id, nameOfOrganization, website, email, charLinkedin, mission)
    }

    handleFileUpload = (event) => {

        this.setState({ file: event.target.files });
    }

    uploadPic = (event) => {

        const { char_id } = this.props.auth;
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file[0]);
        axios.put(`/api/updatecharprofilepic/${char_id}`, formData, {
            char_id,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            this.setState({ 
                charimg: response.data
                })
            this.props.getCharProfilePic(char_id)
        }).catch(error => {
            console.log(error)
        });


    }
    render() {
        if(this.state.redirect) {
            return <Redirect to='/login' />
        }
        return (
            <div className={style.ViewProfile}>
                <div>

                    <img src={this.state.charimg} />
                    <input type="file" onChange={this.handleFileUpload} />
                    <button onClick={this.uploadPic} >Upload</button>

                </div>
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
export default connect(mapStateToProps, { updateCharProfileInfo,getCharProfilePic })(ViewProfile)