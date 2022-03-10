var express = require('express');
var router = express.Router();
const axios = require('axios').default;
const con = require('.././models/connection');
const fs = require('fs');
const { query, validationResult } = require('express-validator');

router.get('/',query('date').isDate() ,async function(req, res,) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors });
  }
  let result = await con.findDate(req.query.date);
  if (result)
    return res.render('index', { response: result });
  axios.get('https://api.nasa.gov/planetary/apod', {
    params: {
      api_key: 'DEMO_KEY',
      date:req.query.date
    }
  })
  .then(async function(response) {
      /* I'm trusting the response data in this case otherwise 
      validation is required*/
      if(response.data.media_type === "image"){
        const filename = new Date().toISOString().slice(0, 10).replaceAll('-',"") + require("randomstring").generate()+'.jpg';
        const file = fs.createWriteStream(`${__dirname}/../public/images/${filename}`);
        let download = await axios.get(response.data.url,{responseType: 'stream'})
        download.data.pipe(file).on('finish', () =>{
            response.data.url = `${req.baseUrl}/images/${filename}`
            con.collection.insertOne(response.data)
            .catch(err=>{
              if (!err.code === 11000) res.json(err);
            })
        })
      }else{
        con.collection.insertOne(response.data)
        .catch(err=>{
          if (!err.code === 11000) res.json(err);
        })
      }
      res.render('index', { response: response.data });
  })
  .catch(function (error) {
    console.log(error);
  })
})

module.exports = router;
