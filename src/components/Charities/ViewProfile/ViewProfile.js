import React, { Component } from "react"
import { Form, Col, Button } from "react-bootstrap"
import style from "./ViewProfile.module.scss"
import { connect } from "react-redux";
import { updateCharProfileInfo, getCharProfilePic, getSession } from "../../../redux/ducks/auth"
import axios from "axios"
import { Redirect } from "react-router-dom"

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
    componentDidMount() {

        this.props.getSession().then(() => {

            this.setState({
                nameOfOrganization: this.props.auth.nameOfOrganization,
                website: this.props.auth.website,
                email: this.props.auth.charemail,
                charLinkedin: this.props.auth.charLinkedin,
                mission: this.props.auth.mission,
                charimg: this.props.auth.charimg,
            })

            if (!this.props.auth.char_id) {
                this.setState({
                    redirect: true
                })
            }
        });
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
        this.props.updateCharProfileInfo(char_id, nameOfOrganization, website, email, charLinkedin, mission).then(() => {
            alert("You successfully updated your profile")
        })
    }

    handleFileUpload = (event) => {

        this.setState({ file: event.target.files });
    }

    uploadPic = (event) => {
        if (!this.state.file) { alert("You didn't choose a file. Please click on picture to upload one and hit Upload button") }
        else {
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
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to='/login' />
        }
        return (
            <div className={style.ViewProfile}>
                <div className={style.Image}>

                    <img src={this.state.charimg} 
                         onClick = {() => this.fileInput.click()}/>
                    <input type="file" 
                           onChange={this.handleFileUpload} 
                           style = {{display : "none"}}
                           ref ={fileInput => this.fileInput = fileInput}/>
                    <div className ={style.Text}>Click on picture to edit and hit upload button</div>
                    <Button variant="primary" type="submit" onClick={this.uploadPic} className = {style.UploadButton} >
                        Upload
                    </Button>
                    

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
export default connect(mapStateToProps, { updateCharProfileInfo, getCharProfilePic,getSession })(ViewProfile)