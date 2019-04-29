import React, { Component } from 'react';
import Header from "./components/Header/Header"
import {HashRouter} from "react-router-dom"
import routes from "./components/routes"

class App extends Component {
  render() {

    return (
      <div>

        <HashRouter>
           <Header />
           {routes}
        </HashRouter>
        
      </div>
    );

  }
}

export default App;
