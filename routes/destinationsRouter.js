const express = require('express');
const router = express.Router();
const Destination = require('../models/destination');

router.post('/', async (req, res) => {
  try {
    const { name, address, website } = req.body;
    const destination = new Destination({ name, address, website });
    await destination.save();
    res.status(201).send(`Destination created successfully!`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/', async (req, res) => {
  try {
    const destinations = await Destination.find().exec();
    res.json(destinations);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;