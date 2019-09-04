const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const planSchema = new Schema({
  title : String,
  length: Number,
  people: Number,
  allergents: String,
  preferredFood: String,
  _menuObjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Meals"
    }
  ],
author: {
  type: Schema.Types.ObjectId,
  ref: "User"
}
});

const Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;