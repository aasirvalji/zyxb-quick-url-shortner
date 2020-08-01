const express = require('express');
const router = express.Router();
const Url = require('../../models/Url');

router.get('/:code', async (req, res) => {
  try {
    var url = await Url.findOne({ shortCode: req.params.code });

    if (url) return res.redirect(url.longUrl);
    else {
      return res.status(404).send("Sorry, that short url doesn't exist");
    }
  } catch (err) {
    console.err(err.message);
    res.send(500).send('Sorry, there was a server error');
  }
});

module.exports = router;
