import React, { Component } from 'react';
import style from "./Home.module.scss";
import {Link} from "react-router-dom" 
import SupportCommunity from "../SupportCommunity/SupportCommunity"

class Home extends Component {
  render() {

    return (
      <div className = {style.Home} >
          
          
          <h1 className = {style.Text}>We bring Junior developers and charity organizations together for a cause</h1>
          <Link to = "/signupdev">
              <button className = {style.Button1}>Developers Sign Up Here</button>
          </Link>
          <Link to = "/signupchar">
             <button className = {style.Button2}>Charities Sign Up Here</button>
           </Link>
         
           <SupportCommunity />

          
           {/* <Link to = "/supportcommunity">
             <button className = {style.Button3}>Support Community</button>
           </Link> */}

        
        
      </div>
    );

  }
}

export default Home;