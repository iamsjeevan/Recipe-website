const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/recipe_db'; // Default to local MongoDB if no URI set

    if (!mongoURI) {
      console.error('Mongo URI is not defined');
      process.exit(1); // Exit if the URI is not defined
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit on error
  }
};

module.exports = connectDB;
