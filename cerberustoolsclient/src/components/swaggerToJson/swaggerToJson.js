import React from 'react';
//import ReactDOM from 'react-dom';
import Axios from 'axios';
import YAML from 'json2yaml';

export default class swaggerToJson extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          swaggerJson: ""
        }
        this.getSwaggerJson = this.getSwaggerJson.bind(this);
    }

    getSwaggerJson() {

        let uri = document.getElementById("uriInput").value;
        let encodedUri = encodeURIComponent(uri);
      
        Axios.get('/swagger/' + encodedUri) //url to server is in  param proxy in package.json
          .then(response => {
            let respStr = JSON.stringify(response.data);
            console.log("Success!: " + respStr);
            this.convertJsonToYaml(response.data);
          })
          .catch(error => {
            alert("Error. See console");
            console.log("Error: " + error);
          });
    
      }
    
      convertJsonToYaml(json) {
        let yaml = YAML.stringify(json);
        let textArea = document.getElementById("swaggerJsonResult");
        textArea.value = yaml;
      }

   render() {
      return (
        <div className="App">
        <header className="App-header">
            uri:
          <input id="uriInput" type="text"/>
          <button onClick={() => {this.getSwaggerJson()}}>Send</button>

        result:
        <textarea id="swaggerJsonResult" value={this.state.swaggerJson}></textarea>

        </header>
      </div>
      );
   }
}