const exp = require("express");
const { MongoClient } = require('mongodb');
const petApp = exp.Router();
const expressAsyncHandler = require('express-async-handler');

require('dotenv').config();

// Add body parser middleware
petApp.use(exp.json());

// Route to get all pet concerns
petApp.get('/pet-concerns', expressAsyncHandler(async (req, res) => {
  try {
    // Retrieve the petConcerns collection from the app settings
    const petCollection = req.app.get('petCollection');
    
    // Fetch all pet concerns from the collection
    const petConcerns = await petCollection.find().toArray();
    
    // Send the pet concerns as JSON response
    res.json(petConcerns);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ message: "An error occurred while fetching pet concerns", error: error.message });
  }
}));

module.exports = petApp;
