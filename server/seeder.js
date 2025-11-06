const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/sampleUsers');
const User = require('./models/User');
const connectDB = require('./config/db');

// Load .env variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Function to import data
const importData = async () => {
  try {
    // 1. Clear existing data
    await User.deleteMany();
    
    // 2. Insert sample users
    // .create() will trigger the 'pre-save' hook for password hashing
    await User.create(users);

    console.log('Data Imported! All users have been created.');
    console.log('-------------------------------------------');
    console.log('You can log in with:');
    console.log('Admin: admin@almalink.com');
    console.log('Users: priya@almalink.com, rohan@almalink.com, etc.');
    console.log('Password for all: password123');
    console.log('-------------------------------------------');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Function to destroy data
const destroyData = async () => {
  try {
    await User.deleteMany();
    
    console.log('Data Destroyed! All users removed.');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Check for command-line arguments
if (process.argv[2] === '-d') {
  // Run 'node server/seeder.js -d' to destroy
  destroyData();
} else {
  // Run 'node server/seeder.js' to import
  importData();
}