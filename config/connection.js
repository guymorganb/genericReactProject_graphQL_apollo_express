const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = () => {
  const username = encodeURIComponent(process.env.MONGOADMIN);
  const password = encodeURIComponent(process.env.MONGOPASS);
  const dbName = 'Test'; // Connects to capital 'T'est database

  const mongoURI = `mongodb://${username}:${password}@localhost:27017/${dbName}?authSource=${dbName}`;

  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));
    // The options {useNewUrlParser: true, useUnifiedTopology: true} are provided to avoid deprecation warnings.
};

module.exports = connectDB;