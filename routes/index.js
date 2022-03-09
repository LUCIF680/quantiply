var express = require('express');
var router = express.Router();
const axios = require('axios').default;
const con = require('.././models/connection');
const fs = require('fs');

router.get('/', async function(req, res,) {
  let result = await con.findDate();
  if (result)
    return res.render('index', { response: result });
  axios.get('https://api.nasa.gov/planetary/apod', {
    params: {
      api_key: 'DEMO_KEY',
      date:'2022-03-09'
    }
  })
  .then(response=> {
      /* I'm trusting the response data in this case otherwise 
      validation is required*/
      con.insertOne(response.data)
      .catch(err=>{
        if (!err.code === 11000) res.json(err);
      })
      res.render('index', { response: response.data });
  })
  .catch(function (error) {
    console.log(error);
  })
})

module.exports = router;
