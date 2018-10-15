var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET swagger from url. */
router.get('/', function(req, res, next) {

    console.log("Getting next departure...");

    let travelUri = 'https://otp-pp-sl.samtrafiken.se/otp/routers/default/plan?fromPlace=stop+N%C3%A4ckrosen+%3A%3A59.366255%2C17.983125&toPlace=stop+Kista+%3A%3A59.402941%2C17.942684&mode=TRANSIT%2CWALK&maxWalkDistance=750&arriveBy=false&wheelchair=false&locale=en';

    console.log("From: " + travelUri);

    let date = req.query.date;
    let time = req.query.time;

  console.log("Date: " + date + ". Time: " + time);

    axios.get(travelUri, {
      params: {
        time: time,
        date: date
      }
    })
    .then(response => {

      console.log("Success!");

      let departure = JSON.stringify(response.data.plan.itineraries[0].startTime);
      console.log("Departure: " + departure);

      res.send(departure);
    })
    .catch(error => {
      console.log("Error!: " + error);    
    });
});

module.exports = router;
