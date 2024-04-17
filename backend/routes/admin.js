const express = require('express');

//Controller functions
const {fetchWholeDatabase} = require('../controllers/adminController');


const router = express.Router()





router.get('/geteverything', (req, res) => {
    fetchWholeDatabase()
      .then(allData => {
        res.send(allData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
      });
  });
  



module.exports = router;