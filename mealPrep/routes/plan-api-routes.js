const express = require('express');
const router  = express.Router();
const axios = require("axios");
const { RecipeSearchClient } = require('edamam-api');

// const client = new foodDatabaseClient({
//   appId: '522bfc01',
//   appKey: '15f84bd55ca991de46a8878ead9a9107'
// });





router.get('/api/plan/new/:id', (req, res, next) =>{
  // Meal.create()
  client.search({ query: req.params.search })
  .then((foundMeal) => {
    res.json(foundMeal)
  })
  .catch((err) => {
    console.log(err)
  })
})


module.exports = router;