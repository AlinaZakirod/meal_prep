const express = require("express");
const router = express.Router();
const Meal = require('../models/Meal');


//create a meal routes:
router.get('/meals/new', (req, res, next) => {
  res.render('meal-views/new-meal')
})

router.post('/meals/create' , (req, res, next) => {
  Meal
    .create(req.body)
    .then(newMeal => {
      res.redirect('/meals')
    })
    .catch(err => console.log("error while creating a meal", err))
})

//display all the meals:
router.get('/meals', (req, res, next) => {
  Meal
    .find()
    .then(mealsFromDb => res.render('meal-views/meals', {meals: mealsFromDb}))
    .catch(err => console.log('error while getting the meals', err))
})

//to edit the meal:
router.get('/meals/:Id/edit', (req, res, next) =>{
  Meal
    .findById(req.params.Id)
    .then(theMeal => res.render('meal-views/edit-meal', {theMeal}))
    .catch(err => console.log('error while editing the meal', err))
  })

router.post('/meals/:Id/update', (req, res, next) => {
  Meal
    .findByIdAndUpdate(req.params.Id, req.body)
    .then(res.redirect(`/meals/${req.params.Id}`))
    .catch(err => {
      res.redirect(`/meals/${req.params.Id}`)
      console.log('error while updating the meal', err)
    })
})


//to delete the meal
router.post('/meals/:Id/delete', (req, res, next) => {
  Meal
    .findByIdAndRemove(req.params.Id)
    .then(() => res.redirect('/meals'))
    .catch(err => console.log("error while deleting your meal", err))
})



//to show details-must be the last
router.get('/meals/:Id', (req, res, next) => {
  Meal
    .findById(req.params.Id)
    .then(theMeal => {
      res.render('meal-views/meal-details', {theMeal});
    })
    .catch(err => console.log("error while dispalying your meal", err))
})


module.exports = router;