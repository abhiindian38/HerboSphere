const exp = require("express");
const { MongoClient } = require('mongodb');
const commApp = exp.Router();
const expressAsyncHandler = require('express-async-handler');

require('dotenv').config();

// Add body parser middleware
commApp.use(exp.json());

// Route to get all remedies
commApp.get('/remedies', expressAsyncHandler(async (req, res) => {
  try {
    // Retrieve the remedies collection from the app settings
    const communityCollection = req.app.get('communityCollection');
    
    // Fetch all remedies from the collection
    const remedies = await communityCollection.find().toArray();
    
    // Send the remedies as JSON response
    res.json(remedies);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ message: "An error occurred while fetching remedies", error: error.message });
  }
}));

// Route to add a new remedy
commApp.post('/remedies', expressAsyncHandler(async (req, res) => {
  try {
    const { name, ingredients, preparation, benefits, rating } = req.body;

    // Validate incoming data
    if (!name || !ingredients || !preparation || !benefits) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Retrieve the remedies collection from the app settings
    const communityCollection = req.app.get('communityCollection');
    
    // Insert the new remedy into the collection
    const result = await communityCollection.insertOne({
      name,
      ingredients,
      preparation,
      benefits,
      rating: rating || 0, // Default rating to 0 if not provided
    });

    // Fetch the newly inserted remedy
    const newRemedy = await communityCollection.findOne({ _id: result.insertedId });

    // Send a success response with the newly added remedy
    res.status(201).json({
      message: 'Remedy added successfully',
      remedy: newRemedy, // Return the newly added remedy
    });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ message: "An error occurred while adding the remedy", error: error.message });
  }
}));

module.exports = commApp;
