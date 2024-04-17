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

    // Fetch data from Model1 to Model8
    dataPromises.push(Model1.find());
    dataPromises.push(Model2.find());
    dataPromises.push(Model3.find());
    dataPromises.push(Model4.find());
    dataPromises.push(Model5.find());
    dataPromises.push(Model6.find());
    dataPromises.push(Model7.find());
    dataPromises.push(Model8.find());

    // Wait for all promises to resolve
    const allData = await Promise.all(dataPromises);

    return allData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // or handle the error in a different way
  }
}

// Example usage
fetchWholeDatabase()
  .then(allData => {
    console.log('Data from Model1:', allData[0]);
    console.log('Data from Model2:', allData[1]);
    console.log('Data from Model3:', allData[2]);
    console.log('Data from Model4:', allData[3]);
    console.log('Data from Model5:', allData[4]);
    console.log('Data from Model6:', allData[5]);
    console.log('Data from Model7:', allData[6]);
    console.log('Data from Model8:', allData[7]);
    // Process the data further or pass it to your frontend
  })
  .catch(error => {
    // Handle errors
  });
