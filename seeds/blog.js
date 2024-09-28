// REQURING MONGOOSE
const mongoose =require("mongoose");

// REQURING MODEL
const Blog = require("../models/blogs")


// DATABASE CONNECTON

mongoose.connect("mongodb://localhost:27017/blog", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=> {
    console.log("connected to MongoDB")
}).catch((error)=>{
    console.log("Failed to connect to MongoDB", error)
})



// DUMMY DATA

const  dummyText = [
    {
    title:"Story for the GOd's",
    author:"Lord Muse",
    createdAt: 5.00,
    description:"A summary of a cock and bull stories oftten told to deceive people",
    timee:"A summary of a cock and bull stories oftten told to deceive people",
    category: "entertainment",
    tag:"top"
},
    {
    title:"Peter Obi",
    author:"Lord Muse",
    createdAt: 5.00,
    description:"A politican is seek out for the intrest of nigerial at heart",
    timee:"A politican is seek out for the intrest of nigerial at heart",
    category: "news",
    tag:"trending"
},
    {
    title:"Dangote Refineries",
    author:"Lord Muse",
    createdAt: 5.00,
    description:"A call to awaking Nigeia economy",
    timee:"A call to awaking Nigeia economy",
    category: "finances",
    tag:"top"
},
    {
    title:"The power of AI's in our generation today",
    author:"Lord Muse",
    createdAt: 5.00,
    description:"A summary of a cock and bull stories oftten told to deceive people",
    timee:"A summary of a cock and bull stories oftten told to deceive people",
    category: "tech",
    tag:"latest"
},
]
Blog.insertMany(dummyText)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });





