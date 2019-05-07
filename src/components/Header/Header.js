import React, { Component } from "react";
import style from "./Header.module.scss"
import { Link } from "react-router-dom"
import logo from "./icon.png"
import {connect} from "react-redux"
import {Dropdown} from "react-bootstrap"
import {logout} from "../../redux/ducks/auth"
class Header extends Component {
    render() {
      
        return (
            <div className={style.header}>
            <Link to = "/">
                <img src={logo} alt = "develop"/>

            </Link>

                <label for= {style.toggle} >Menu &#9776;</label>
                <input type="checkbox" id= {style.toggle} />

                <div className= {style.headerRigth}>
                    <div>

                        <Link to="/about"><button>About us</button></Link>

                    </div>

                    <div>

                        <Link to="/contact"><button>Contact</button></Link>

                    </div>
                    <div>
                        <Link to = "/supportcommunity"><button>Support Community</button></Link>
                    </div>
                    <div>
                        
                        {this.props.auth.isLogedIn && this.props.auth.id? 
                            <div>
                               
                                <Link to = "/dev/myprofile" ><button>My Profile</button></Link>
                                <Link to = "/dev/findproject" ><button>Find Project</button></Link>
                                <Link to = "/dev/appliedproject" ><button>Applied Project</button></Link>
                                <button onClick = {() => this.props.logout()}>Logout</button>

                            </div>
            
                        
                        
                            
                        : this.props.auth.isLogedIn && this.props.auth.char_id ?
                            <div>
                               
                                <Link to = "/char/viewprofile" ><button>My Profile</button></Link>
                                <Link to = "/char/postproject" ><button>Post Project</button></Link>
                                <Link to = "/char/myprojects" ><button>My Projects</button></Link>
                                <Link to = "/">
                                <button onClick = {() => this.props.logout()}>Logout</button>
                                </Link>

                            </div>
                        
                        
                        : <Link to="/login"><button>Login</button></Link> 
                    }
                
                    </div>
                    

                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;


export default connect (mapStateToProps, {logout})(Header);