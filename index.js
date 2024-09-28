const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride =require("method-override")

// REQUIRING MODEL
const Product = require("./models/product");

const app = express();
const PORT = 3000;

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"))
// TEMPLATE ENGINE
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


// VARIABLES
const categories = ["fruit", "diary", "vegetable", "mushrum"]



// ROUTING
// Show
app.get("/Products", async (req, res) => {
    const {category}= req.query;
    if(category){

      const products= await Product.find({category})
      res.render("products/index",  {products, category})

    }else{
      const products =await Product.find({});
      res.render("products/index", {products, category:"All"})
    }

}); 



// New: Rendering the form!
app.get("/Products/new", (req, res) => {
    res.render("products/new", {categories})
})

// New: Posting the form!
app.post("/Products", async (req, res) => {
    // const {name , price, category} = req.body;
     
     const newProduct= new Product(req.body)
     res.send(newProduct);
      // await newProduct.save();

     res.redirect(`/Products/${newProduct.id}`)
})






// Details
app.get("/Products/:id", async(req, res)=> {

    const {id}= req.params;
    const products = await Product.findById(id)
   
    
    res.render("products/details",{products})


})

//Update: update form
app.get("/Products/:id/edit", async(req, res) => {
  const {id} = req.params;
  const products= await Product.findById(id);
  

  res.render("products/edit", {products, categories})
}) 


// Updated: post request
app.put("/Products/:id", async(req, res)=> {
  const {id} = req.params
  const products = await Product.findByIdAndUpdate( id, req.body, {runValidators:true})
  res.redirect(`/Products/${products.id}`)
})

// Delete:
app.delete("/Products/:id", async(req, res)=> {
  const {id} = req.params
  const products= await Product.findByIdAndDelete(id)
  res.redirect(`/Products`)
})










// DATABASE CONNECTION
mongoose
  .connect("mongodb://localhost:27017/farmStand", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(`Failed to connect to MongoDb`, err);
  });



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
