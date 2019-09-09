const express = require('express');
const router  = express.Router();
const axios = require("axios");
const { RecipeSearchClient } = require('edamam-api');

const client = new foodDatabaseClient({
  appId: '522bfc01',
  appKey: '15f84bd55ca991de46a8878ead9a9107'
});

router.get('/', (req, res, next) =>{
  res.render('index');
})

router.get('/ing/:search',(req,res,next)=>{

  client.search({ query: req.params.search })
  .then((ingr)=>{
    res.json(ingr)
  })
  .catch((err)=>{
    console.log(err)
  })
})

// router.post('/', (req, res, next) => {

// })

module.exports = router;