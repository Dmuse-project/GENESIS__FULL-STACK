const mongoose =require("mongoose");
const Inverter =require("../models/inverterPrototype");


// DATABASE CONNECTION

mongoose
  .connect("mongodb://localhost:27017/Genesis", {

  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(`Failed to connect to MongoDb`, err);
  });



// Sample inverter recommendations
const inverterRecommendations = [
    { maxLoad: 5000, model: 'Inverter 1', description: 'Basic Inverter for small loads', price: 1.500000 },
    { maxLoad: 10000, model: 'Inverter 2', description: 'Medium Inverter for medium loads', price: 3.500000 },
    { maxLoad: 20000, model: 'Inverter 3', description: 'Heavy-Duty Inverter for large loads', price: 7.500000  }
];


// INSERTING TO DATABASE
Inverter.insertMany(inverterRecommendations).then((response) => {
    console.log(response);
})
.catch((error) => {
    console.log(error);
});