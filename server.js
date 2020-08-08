const mongoose = require('mongoose');
const colors = require('colors');
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
var cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();

connectDB();

app.use(express.json());

app.use(cors());

//Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Prevent XSS attacks
app.use(xss());

// redirect route
app.use('/', require('./routes/v1'));

// create resource route
app.use('/api/url', require('./routes/v1/url.js'));


// Serve static assets in production
if (process.env.environment === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

  const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.green.underline)
);
