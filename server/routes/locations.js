var express = require('express');
var router = express.Router();

const Location = require('../models/Location');

/* List all locations */
router.get('/', async (req, res) => {
  let data = await Location.find({});
  console.info(`records retrieved from mongoose:`, data?.length)
  res.send(data);
});

/* List one location by ID. */
router.get('/:id', async function(req, res) {
  try {
    const data = await Location.findOne({_id: req.params.id});
    console.info(`Found Location:`, data)
    res.send(data);
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
});

module.exports = router;