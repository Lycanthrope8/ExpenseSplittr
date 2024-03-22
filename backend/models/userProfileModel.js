const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userProfileSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    age: {
      type: Number,
      default: 0,
    },
    gender: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },    
    userId: {
      type: String,
      required: true,
    },
    homeId: {
      type: String,
      default: "",
    },
    expenseTags: {
      type: [],
      default: ["Food", "Transportation", "Housing", "Entertainment", "Utilities"],
    },
  },
);

userProfileSchema.methods.addExpenseTags = function(tags) {
  this.expenseTags.push(...tags);
  return this.save();
}

userProfileSchema.methods.removeExpenseTags = function(tags) {
  this.expenseTags = this.expenseTags.filter(tag => !tags.includes(tag));
  return this.save();
}



module.exports = mongoose.model('UserProfile', userProfileSchema)