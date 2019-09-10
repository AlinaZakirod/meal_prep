const express = require("express");
const router = express.Router();
const Plan = require('../models/Plan');
const Meal = require('../models/Meal');


router.get('/plans/new', (req, res, next) => {

let calories = req.body.kcal;
let carbs = rerq.body.carbs;



  axios.get('https://api.edamam.com/search?app_id=$f8e66ec4&app_key=$9741c69dc99cb5c20165983a131f9890')
  .then((foundMeal) => {
    res.json(foundMeal)
  })
  .catch((err) => {
    console.log(err)
  })
 

  // Meal
  //   .find()
  //   .then(allMeals => res.render("plan-views/new-plan", {allMeals}))
  //   .catch(err => console.log('error while creating new plan', err))
})

router.get('/new/:idVariable', (req, res, next) => {
  const theId =req.params.idVariable;
  Meal
    .findById(theId)
    .then((result) => {
      res.render('plan-views/plan-details', {theSinglePlan: result})
    })
    .catch((err) => {
      next(err)
    })
})

// ______________________
// new Post route:
router.post('/api/plan/new/:id', (req, res, next) => {
  console.log('jygfui')
  client.search({ query: req.params.search })
  .then(result => console.log(result.data))
    .catch(err => console.log('error', err))
})
// ______________________

// before axios POST route:
// router.post('/plans/create', (req, res, next) => {
//   Plan 
//     .create(req.body) 
//     .then(newPlan => {
//       res.redirect('/plans')
//     })
//     .catch(err => console.log('error', err))
// })




//route for all plans
router.get('/plans', (req, res, next) => {
  Plan
    .find()
    .then(plansFromDb => res.render('plan-views/plans', {plans: plansFromDb}))
    .catch(err => console.log("error while getting plans", err));
});


//to edit the plan (edit form):
router.get('/plans/:Id/edit', (req, res, next) => {
  Plan
    .findById(req.params.Id)
    .then(thePlan => {
      Plan
        .findById(req.params.Id)
        .then(thePlan => res.render('plan-views/edit-plan', {thePlan}))
    })
    .catch(err => console.log("error while editing the plan:", err))
})

router.post('/plans/:Id/update', (req, res, next) => {
  Plan
    .findByIdAndUpdate(req.params.Id, req.body)
    .then(res.redirect(`/plans/${req.params.Id}`))
    .catch(err => {
      res.redirect(`/plans/${req.params.Id}`)
      console.log("error while updating the movie", err)
    })
})



//to delete the plan:
router.post('/plans/:Id/delete', (req, res, next) => {
  Plan
    .findByIdAndRemove(req.params.Id)
    .then(() => res.redirect('/plans'))
    .catch(err => console.log('error while deleting the movie', err))
})



//to see details of the plan
router.get('/plans/:Id', (req, res, next) => {
  Plan
    .findById(req.params.Id)
    .then(thePlan => {
      res.render('plan-views/plan-details', {thePlan});
    })
    .catch( err => console.log('error while displaying details of the plan', err))
})



module.exports = router;