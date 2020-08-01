const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

router.post('/shorten', async (req, res) => {
  var longUrl = req.body.url;
  var baseUrl = process.env.devUrl;
});

module.exports = router;
