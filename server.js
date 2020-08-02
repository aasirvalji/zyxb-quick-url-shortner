const mongoose = require('mongoose');
const colors = require('colors');
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
var cors = require('cors');

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

// redirect route
app.use('/', require('./routes/v1'));

// create resource route
app.use('/api/url', require('./routes/v1/url.js'));

const PORT = 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.green.underline)
);
