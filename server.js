const mongoose = require('mongoose');
const colors = require('colors');
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json());

// redirect route
app.use('/', require('./routes/v1'));

// create resource route
app.use('/api/url', require('./routes/v1/url.js'));

const PORT = 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.green.underline)
);
