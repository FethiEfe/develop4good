import React, { Component } from "react";
import style from "./Header.module.scss"
import { Link } from "react-router-dom"
import logo from "./icon.png"


export default class Header extends Component {
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
                        
                        <Link to="/login"><button>Login</button></Link>

                    </div>

                </div>
            </div>
        )
    }
}