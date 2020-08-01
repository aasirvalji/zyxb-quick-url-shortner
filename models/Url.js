const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  longUrl: String,
  shortUrl: String,
  shortCode: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Url', UrlSchema);
