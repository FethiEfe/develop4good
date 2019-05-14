import React, { Component } from 'react';
import style from "./About.module.scss";
import pic from "./about.jpg"

class About extends Component {
  render() {

    return (
      <div className = {style.About} >
          <img src = {pic} alt =""/>
          <p>In the 21st century, technology is advancing and globalization is inevitable. So in order to bring our charities up to date, our group is solely focused on providing non-profit service through our volunteer of developers. We strongly believe our mission of bringing charities and web developers together to have a greater impact on humanity as whole.</p>
          
      </div>
    );

  }
}

export default About;