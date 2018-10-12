var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET swagger from url. */
router.get('/:uri', function(req, res, next) {

  //let swaggerJsonUri = "https://testapi.tele2.se/v1/residential/vas/swagger/docs/v1";

  // console.log("request comes in");

  let swaggerUri = req.params.uri;

  // console.log("encoded uri: " + req.params.uri);
  
  // let decodedSwaggerUri = decodeURIComponent(swaggerUri);

  // console.log("Decoded uri: " + decodedSwaggerUri);
  console.log("Getting swagger json...")
  axios.get(swaggerUri)
    .then(response => {
      let respStr = JSON.stringify(response.data);
      console.log("Success!: " + respStr);
      res.send(respStr);
    })
    .catch(error => {
      console.log("Error!: " + error);    
    });

  
});

module.exports = router;
