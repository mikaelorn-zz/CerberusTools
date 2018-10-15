import React from 'react';
import Axios from 'axios';
import Moment from 'moment';

export default class travelPlanner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            minsToNextTrip: ""
        }
        this.getNextTrip = this.getNextTrip.bind(this);
    }

    getNextTrip() {
        
        let currentDate = new Date();

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let hour = currentDate.getHours();
        let minute = currentDate.getMinutes();

        let date = month + '-' + day + '-' + year;
        let time = hour + '%3A' + minute + 'pm';

        let self = this; //should not be needed

        Axios.get('/travel', {
            params: {
                date: date,
                time: time
            }
        })
        .then(response => {
            let epochTime = response.data;
            console.log("returned epochTime: " + response.data);
            self.calculateMinutes(epochTime);
          })
          .catch(error => {
              if(error) {
                alert("Error. See console");
                console.log("Error: " + error);
              }
          });
    }

    calculateMinutes(epochTime) {

        let departure = Moment(new Date(epochTime));
        let now = Moment(new Date());

        let diff = Moment.duration(departure.diff(now)).humanize();

        this.setState({
            minsToNextTrip: diff
        });
    }

   render() {
      return (
        <div>
            Från: <input id="fromStation" type="text" />
            Till: <input id="toStation" type="text" />
            <button onClick={() => {this.getNextTrip()}}>Hitta</button>
            Min: <input id="nextDeparture" type="text" value={this.state.minsToNextTrip} />
        </div>
      );
   }
}