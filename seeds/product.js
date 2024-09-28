// REQUIRE MONGOOSE
const mongoose = require("mongoose");

// REQUIRING MODEL
const Product = require("../models/product");
const {v4: uuidv4} = require("uuid");




// DATABASE CONNECTION

mongoose
  .connect("mongodb://localhost:27017/Genesis", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(`Failed to connect to MongoDb`, err);
  });

// DUMMY DATA
const seedProducts = [
  {
    name: "Monopolic solar panel",
    price: 90000,
    category: "solar-panels",
    _id: uuidv4(),
  },
  {
    name: "3kva inverter",
    price: 4.99,
    category: "inverters",
    _id: uuidv4(),
  },
  {
    name: "220 amps dc battery",
    price: 4.99,
    category: "battery",
      _id: uuidv4(),

  },
  {
    name: "220 amps dc battery",
    price: 4.99,
    category: "battery",
      _id: uuidv4(),

  },
  {
    name: "220 amps dc battery",
    price: 4.99,
    category: "battery",
      _id: uuidv4(),
  },
  {
    name: "220 amps dc battery",
    price: 4.99,
    category: "battery",
    _id: uuidv4(),
  },
 
];

// // INSERTING TO DATABASE
Product.insertMany(seedProducts)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

//   CREATING A SINGLE NEW PRODUCTS
// const productOne = new Product({
//   name: "Battery product",
//   price: 2000,
//   category: "battery",
// });

// // SAVE PRODUCT
// productOne
//   .save()
//   .then((p) => {
//     console.log(p);
//   })
//   .catch((e) => {
//     console.log(e);
//   });
