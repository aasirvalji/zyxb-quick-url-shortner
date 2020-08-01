const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB'.bgBlue);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDB;
