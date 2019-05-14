import React, { Component } from 'react';
import pic from "./404.jpg"
import style from "./ErrorPage.module.scss"

class ErrorPage extends Component {
  render() {

    return (
      <div className = "ErrorPage" >
        <img src ={pic} className ={style.Error} alt =""/>
      </div>
    );

  }
}

export default ErrorPage;