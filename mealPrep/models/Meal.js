const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const mealSchema = new Schema({
  title : String,
  kcal: Schema.Types.Mixed,
  ingridients: String,
  author: {
  type: Schema.Types.ObjectId,
  ref: "User"
}
});

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;