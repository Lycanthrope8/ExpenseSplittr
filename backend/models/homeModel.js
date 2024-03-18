const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const homeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  home_id: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  accommodationType: {
    type: String,

    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  rentAmount: {
    type: Number,
    required: true,
  },
  utilitiesIncluded: {
    type: Boolean,
    default: false,
  },
  furnished: {
    type: Boolean,
    default: false,
  },
  petsAllowed: {
    type: Boolean,
    default: false,
  },
  smokingAllowed: {
    type: Boolean,
    default: false,
  },
  moveInDate: {
    type: Date,
    required: true,
  },
  images: [String], // List of image URLs
  houseRules: [String], // List of house rules
  owner_id: {
    type: String,
    required: true,
    unique: true,
  },
  currentMembers: {
    type: [String],
    default: [],
  },
  pendingMembers: {
    type: [String],
    default: [],
  },
});

// Create a model from the schema
const Home = mongoose.model("Home", homeSchema);

module.exports = Home;
