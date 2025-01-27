let exp = require("express");
const { Db } = require('mongodb');
const plantApp = exp.Router();
const tokenVerify = require('../middlewares/tokenVerify.js');
const expressAsyncHandler = require('express-async-handler');

require('dotenv').config();

// Add body parser middleware
plantApp.use(exp.json());

// Route to get all plants
plantApp.get('/plants', expressAsyncHandler(async (req, res) => {
  try {
    const plantsCollection = req.app.get('plantsCollection');
    const plants = await plantsCollection.find().toArray();
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching plants", error: error.message });
  }
}));

plantApp.get(`/order-plant/:name`, expressAsyncHandler(async (req, res) => {
  try {
    const plantsCollection = req.app.get('plantsCollection');
    const plantName = req.params.name; 
    const plant = await plantsCollection.findOne({ name: plantName });

    if (!plant) {
      return res.status(404).json({ message: `Plant ${plantName} not found` });
    }

    res.json(plant);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching plant details", error: error.message });
  }
}));


module.exports = plantApp;
