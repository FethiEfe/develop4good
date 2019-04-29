import React, { Component } from "react";
import style from "./Header.module.scss"
import { Link } from "react-router-dom"
import logo from "./icon.png"
import {connect} from "react-redux"
import {Dropdown} from "react-bootstrap"
import {logout} from "../../redux/ducks/auth"
class Header extends Component {
    render() {
        console.log(this.props.auth.isLogedIn)
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
                        
                        {this.props.auth.isLogedIn ? 
                            <div>
                               
                                <Link to = "/dev/myprofile" ><button>My Profile</button></Link>
                                <Link to = "/dev/findproject" ><button>Find Project</button></Link>
                                <Link to = "/dev/appliedproject" ><button>Applied Project</button></Link>
                                <button onClick = {() => this.props.logout()}>Logout</button>

                            </div>
            
                        
                        
                            
                        :  <Link to="/login"><button>Login</button></Link> }
                
                    </div>
                    

                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;


export default connect (mapStateToProps, {logout})(Header);