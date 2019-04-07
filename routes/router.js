const express = require('express');
const router = express.Router();
const product = require('./product');


router.post('/',product);

module.exports = router;