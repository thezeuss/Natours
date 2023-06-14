require('dotenv').config({ path: '../../config.env' });;
const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../models/tour');
// const User = require('../../model/userModel');
// const Review = require('../../model/reviewModel');


 mongoose.connect( 'mongodb://127.0.0.1:27017/natours', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });

    
 
    // Reading JSON file
    const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));
    // const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
    // const reviews = JSON.parse(fs.readFileSync('reviews.json', 'utf-8'));
    
    // Importing all data to DB
    const importData = async () => {
      try {
        await Tour.create(tours);
        // await User.create(users, { validateBeforeSave: false });
        // await Review.create(reviews);
        console.log('Data successfuly loaded');
      } catch (err) {
        console.log(err);
      }
      process.exit();
    };
    
    // Delete existing data form DB
    const deleteData = async () => {
      try {
        await Tour.deleteMany();
        // await User.deleteMany();
        // await Review.deleteMany();
        console.log('All data have been deleted successfully');
      } catch (err) {
        console.log(err);
      }
      process.exit();
    };
    
    if (process.argv[2] === '--import') {
      importData();
    } else if (process.argv[2] === '--delete') {
      deleteData();
    }
    
    // console.log(process.argv);

