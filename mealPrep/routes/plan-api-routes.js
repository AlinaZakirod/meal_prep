const express = require('express');
const router  = express.Router();
const axios = require("axios");
// const { RecipeSearchClient } = require('edamam-api');

// const client = new foodDatabaseClient({
//   appId: 'f8e66ec4',
//   appKey: '9741c69dc99cb5c20165983a131f9890'
// });

router.get('api/plan/new/:id', (req, res, next) =>{
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