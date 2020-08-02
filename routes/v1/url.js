const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const path = require('path');
const validUrl = require('valid-url');
const shortid = require('shortid');
const Url = require('../../models/Url');
const { nanoid } = require('nanoid');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

router.post('/shorten', async (req, res) => {
  var longUrl = req.body.url;
  var baseUrl = process.env.devUrl;
  var idRegenerationAttempts = 0;

  if (!validUrl.isUri(baseUrl))
    return res.status(400).json({ message: 'Invalid base url' });

  var shortCode = nanoid(5);

  var duplicate = await Url.findOne({ shortCode });

  while (duplicate && idRegenerationAttempts < 5) {
    shortCode = nanoid(5);
    duplicate = await Url.findOne({ shortCode });
    idRegenerationAttempts++;
  }

  if (!validUrl.isUri(longUrl))
    return res.status(400).json({ message: 'Invalid long url' });

  try {
    var url = await Url.findOne({ longUrl });

    if (url) res.json(url);
    else {
      var newShortUrl = new Url({
        shortUrl: process.env.devUrl + '/' + shortCode,
        longUrl,
        shortCode,
      });

      await newShortUrl.save();

      res.json(newShortUrl);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  console.log('reached');
  var shortCode = nanoid(5);

  var temp = 0;

  var duplicate = await Url.findOne({ shortCode });
});

module.exports = router;
