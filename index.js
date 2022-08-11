const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Recipe.create( { title : ""} );
    return Recipe.insertMany(data);

  })

    .then(() =>{
      Recipe.findOneAndUpdate( {title: "Rigatoni alla Genovese"}, {duration: 100}, {new:true}, (error, data)  =>{
        console.log(data);
        if(!error){ return console.log(data);} // the fancy way to not use else
        return console.log(error)
        } 
      )
    })


    .then( () =>{
      return Recipe.deleteOne( {name: "Carrot Cake"}).then( ()=>{
        console.log('Data deleted');
      })
    })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })

  process.on("SIGINT", () =>{
    mongoose.connection.close( ()=>{
      console.log("Mongoose disconnected");
      process.exit(0);
    });
  });

