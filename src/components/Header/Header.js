import React, { Component } from "react";
import style from "./Header.module.scss"
import { Link } from "react-router-dom"
import logo from "./icon.png"
import { connect } from "react-redux"
import { Dropdown } from "react-bootstrap"
import { logout, getSession } from "../../redux/ducks/auth"
class Header extends Component {
    componentDidMount() {
        this.props.getSession();
    }
    render() {

        return (
            <div className={style.header}>
                <Link to="/">
                    <img src={logo} alt="develop" />

                </Link>

                <label for={style.toggle} >Menu &#9776;</label>
                <input type="checkbox" id={style.toggle} />

                <div className={style.headerRigth}>
                    <div className={style.About}>

                        <Link to="/about">About</Link>

                    </div>

                    <div className={style.Contact}>

                        <Link to="/contact">Contact</Link>

                    </div>

                    

                        {this.props.auth.isLogedIn && this.props.auth.id ?
                            <div className = {style.conditionalButton} >
                                <Link to="/dev/myprofile" >My Profile</Link>
                                <Link to="/dev/findproject" >Find Project</Link>
                                <Link to="/dev/appliedproject" >My Project</Link>
                                <Link to="/"><a onClick={() => this.props.logout()}>Logout</a></Link>
                            </div>
                            : this.props.auth.isLogedIn && this.props.auth.char_id ?
                                <div >
                                    <Link to="/char/viewprofile" >My Profile</Link>
                                    <Link to="/char/postproject" >Post Project</Link>
                                    <Link to="/char/myprojects" >My Projects</Link>
                                    <Link to="/"><button onClick={() => this.props.logout()}>Logout</button></Link>
                                </div>


                            : <div className={style.Login}  ><Link to="/login">Login</Link></div>
                        }
               
                    


                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;


export default connect(mapStateToProps, { logout, getSession })(Header);