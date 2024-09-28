const express = require("express");
const bodyParser= require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override")
const ejsMate= require("ejs-mate");
const http= require("http");
const WebSocket= require("ws");
const dotenv = require("dotenv");

dotenv.config();
 
const Visitor = require("./models/visitor");




// VARIABLES
const app= express();
const PORT =9000;




// Middleware to track visitor data
app.use(async (req, res, next) => {
    try {
        const { ip, headers: { 'user-agent': userAgent } } = req;
        const { path } = req;

        await new Visitor({ ip, userAgent, path }).save();

        next();
    } catch (error) {
        next(error);
    }
});


// MIDDLEWARE
app.use(bodyParser.urlencoded({extented:true}));
app.use(express.urlencoded({extented:true }));
app.use (express.static(path.join(__dirname, 'public' )))
app.use ("/img", express.static(path.join(__dirname, 'img' )))

app.use(methodOverride("_method"))


//TEMPLATE ENGINE
app.engine("ejs", ejsMate)
app.set("views", path.join(__dirname, "views"));
app.set("view engine",  "ejs");



// ROUTING
const homeRouter= require('./routes/index');
const adminRouter= require('./routes/admin/index');
const productRouter=require('./routes/products/index');
// const blogRouter=require('./routes/admin/index');
const blogRouter=require('./routes/blog');



app.use("/admin", adminRouter);
app.use("/admin/blog", blogRouter);
app.use("/admin/product", productRouter);
app.use("/home", homeRouter);


app.get("/", (req, res) => {
    res.render("genesis/index")
})





// DATABASE CONNECTION
mongoose.connect("mongodb://localhost:27017/Genesis",  {
    
})
.then(()=>{
console.log("connected to MongoDB my database");
})
.catch((err)=> {
    console.error("Failed to connect to MongoDb", err)
})



app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
})