import React, { Component } from "react"
import { Form, ButtonToolbar, Button } from "react-bootstrap"
import style from "./PostProject.module.scss"
import axios from "axios"
import { connect } from "react-redux"


class PostProject extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            numDev: "",
            skillsReq: "",
            text: ""
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value

        })
    }

    handleSubmit = (e) => {
        console.log("clicked")
        e.preventDefault();
        const { char_id } = this.props.auth
        const { title, numDev, skillsReq, text } = this.state
        axios
            .post(`/api/postproject/${char_id}`, { title, numDev, skillsReq, text })
            .then(res => {

                this.setState({
                    title: res.data.title,
                    numDev: res.data.numDev,
                    skillsReq: res.data.skillsReq,
                    text: res.data.text
                })
                alert(`You successfully posted your request`)
            })
            .catch(err => {
                console.log(`Something went wrong at PostProject.js ${err}`)
            })

    }

    render() {
        return (
            <div className={style.PostProject}>
                <h2 style ={{textAlign:"center"}}>Post Project</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <label className = {style.LabelPostProject}>Title of Project:</label>

                        <Form.Control type="text"
                            placeholder="Give a title to your project request"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <label className = {style.LabelPostProject}>How many developer you need:</label>
                        <Form.Control as="select"
                            name="numDev"
                            value={this.state.numDev}
                            onChange={this.handleChange}
                            id = {style.Option}>
                            <option >0</option>
                            <option >1</option>
                            <option >2</option>
                            <option >3</option>
                            <option >4</option>
                            <option >5</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <label className = {style.LabelPostProject}>Skills Required:</label>
                        <Form.Control type="text"
                            placeholder="Require skills here like JavaScript as frontend NodeJs as backend"
                            name="skillsReq"
                            value={this.state.skillsReq}
                            onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <label className = {style.LabelPostProject}>Explain your project here:</label>
                        <Form.Control as="textarea" rows="3"
                            placeholder="For example what is your project for and what kind of app do you want. Try to be as specific as possible"
                            name="text"
                            value={this.state.text}
                            onChange={this.handleChange} />
                    </Form.Group>


                    <Button variant="primary" type="submit">Post</Button>


                </Form>
            </div>
        )
    }
}
const mapStateToProps = Reduxstate => Reduxstate
export default connect(mapStateToProps)(PostProject)