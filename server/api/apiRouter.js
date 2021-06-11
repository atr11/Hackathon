var express = require('express');
var apiRouter = express.Router();

const location = require('../models/Location');

/* List all locations. */
apiRouter.get('/', async (req, res) => {   
  let data = await location.find({});
  console.info("records retrieved from mongoose:", data?.length);
  res.send(data);
});

module.exports = apiRouter;