const express = require("express");
const router = express.Router();
const Plan = require('../models/Plan');
const Meal = require('../models/Meal');

router.get('/plans/new', (req, res, next) => {
  Meal
    .find()
    .then(allMeals => res.render("plan-views/new-plan", {allMeals}))
    .catch(err => console.log('error while creating new plan', err))
})

router.post('/plans/create' , (req, res, next) => {
  Plan 
    .create(req.body) 
    .then(newPlan => {
      res.redirect('/plans')
    })
    .catch(err => console.log('error', err))
})

//route for all plans
router.get('/plans', (req, res, next) => {
  Plan
    .find()
    .then(plansFromDb => res.render('plan-views/plans', {plans: plansFromDb}))
    .catch(err => console.log("error while getting plans", err));
});

module.exports = router;