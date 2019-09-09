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
// from api-plan:
// router.get('api/plan/new/:id', (req, res, next) =>{
//   // Meal.create()
//   client.search({ query: req.params.search })
//   .then((foundMeal) => {
//     res.json(foundMeal)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// })

// router.get('/api/celebs/details/:id', (req, res, next)=>{
//   let id = req.params.id;
//   Celebrity.findById(id)
//   .then((theCelebrity)=>{
//       res.json(theCelebrity)
//   })
//   .catch((err)=>{
//       next(err);
//   })
// })
router.post('/plans/create', (req, res, next) => {
  let kcal 
  let carbs 
  let fat
  let protein

  Meal 
    .create(req.body) 
    .then(foundMeal => {
      res.json(foundMeal)
    })
    .catch(err => console.log('error', err))
})
// router.post('/api/celebs/edit/:id', (req, res, next)=>{
//   let id = req.params.id;
//   Celebrity.findByIdAndUpdate(id, {
//       name: req.body.theName,
//       occupation: req.body.theOccupation,
//       catchphrase: req.body.theCatchphrase
//   })
//   .then((response)=>{
//       res.json({msg: 'yay, good job'});
//   })  
//   .catch((err)=>{
//       console.log(err);
//   })

// })

//________________________

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