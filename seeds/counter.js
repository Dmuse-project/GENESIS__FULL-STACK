// REQURING MONGOOSE
const mongoose =require("mongoose");

// REQURING MODEL
const SolarData = require("../models/counter");



// DATABASE CONNECTON

mongoose.connect("mongodb://localhost:27017/Genesis", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=> {
    console.log("connected to MongoDB")
}).catch((error)=>{
    console.log("Failed to connect to MongoDB", error)
})



// DUMMY DATA

const  dummyData = [
    {
    installations: 3000,
    totalEnergy: 6000,
    CO2Saved:6,
},
 
]
SolarData.insertMany(dummyData)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });


