// adminController.js

const Model1 = require("../models/userProfileModel");
const Model2 = require("../models/userModel");
const Model3 = require('../models/personalTaskModel');
const Model4 = require('../models/personalExpenseModel');
const Model5 = require('../models/homeTaskModel');
const Model6 = require("../models/homeExpenseModel");
const Model7 = require("../models/homeModel");
const Model8 = require("../models/debtorCreditorModel");

async function fetchWholeDatabase() {
  try {
    const dataPromises = [];

    dataPromises.push(Model1.find());
    dataPromises.push(Model2.find());
    dataPromises.push(Model3.find());
    dataPromises.push(Model4.find());
    dataPromises.push(Model5.find());
    dataPromises.push(Model6.find());
    dataPromises.push(Model7.find());
    dataPromises.push(Model8.find());

    const allData = await Promise.all(dataPromises);

    return allData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

module.exports = { fetchWholeDatabase };
