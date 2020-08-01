const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  try {
    await mongoose.connect(connect, {
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
