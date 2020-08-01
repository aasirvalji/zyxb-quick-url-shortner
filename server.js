const mongoose = require('mongoose');
const colors = require('colors');
const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

const PORT = 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.green.underline)
);
