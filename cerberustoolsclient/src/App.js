import React, { Component } from 'react';
import './App.css';
import SwaggerToJson from './components/swaggerToJson/swaggerToJson';
import TravelPlanner from './components/travelPlanner/travelPlanner';

class App extends Component {


  render() {
    return (
      <div>
        <div>
          <SwaggerToJson />
        </div>
        <div>
          <TravelPlanner />
        </div>
      </div>

    );
  }
}

export default App;
