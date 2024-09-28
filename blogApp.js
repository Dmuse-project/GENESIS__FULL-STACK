// CREATING SERVER
const express = require("express");
const mongoose = require("mongoose")
const bobyParser= require("body-parser");
const path =require("path");
const methodOverride= require("method-override")

const cloudinary = require('cloudinary').v2;
const multer =require("multer");
const {storage} = require("./cloudinary/config")
const upload =multer({storage:storage});
const dotenv = require("dotenv");
dotenv.config();

// REQUIRING MODEL
const Blog =require("./models/blogs");
const bodyParser = require("body-parser");


// VARIABLES
const app =express();
const PORT =9000
const categories=["entertainment","finances", "news","sport", "tech"]
const tag =["latest", "top","trending"]

// MIDDLEWARES
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(methodOverride("_method"))

// VIEW TEMPLATE ENGINE
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.send("home page! enter /Blog",)
})

// ROUTING
// Display all
app.get("/Blog", async (req, res)=> {
    const {category, tag}= req.query

    let blogs;

    if(category){
          blogs= await Blog.find({ category})
         res.render("Blog/index", {blogs, category, tag:category})
    }  if(tag){
         blogs =await Blog.find({tag})
        res.render("Blog/index",{blogs,  category:tag, tag})
    }
    
    
    else{
   blogs= await Blog.find({})
  res.render("Blog/index", {blogs, category:"All", tag:"All"})
    }


})



//Create: rendering new the forms
app.get("/Blog/new", (req, res)=> {

    // res.send("it worked!")
    res.render("Blog/new",{ categories, tag})
})

// Create: posting  new blog 
app.post("/Blog",  upload.array("image"), async (req, res)=> {
    try{
    const {id, title, author, description, category, tag} = req.body;
    const blogs=  new Blog({id,title, author  , description, category, tag})
    
    const images = req.files.map((obj) => ({
        url: obj.path,
        filename: obj.filename,
      }));
    
       blogs.image= images
     
    await blogs.save();
    res.redirect(`/Blog/${blogs.id}`)
    }catch(e){
        res.status(500).send('Error occurred'); 
        console.log(e)
    }
    

})


// Details
app.get("/Blog/:id", async (req, res)=> {

    try{
        const {id}= req.params;
        const blogs = await Blog.findById(id)
        res.render("Blog/details", {blogs})
    }catch(e){
        res.status(500).send('Error occurred'); 
        console.log(e) 
    }
   
    
})

// Updating: rendering the form
app.get("/Blog/:id/edit", async (req, res) => {
    try{
        const {id} = req.params;
        const blogs= await Blog.findById(id);
        res.render("Blog/edit", {blogs, categories, tag});
    } catch(e){
        res.status(500).send('Error occurred'); 
        console.log(e) 
    }
    
   
})


// Update: posting the form
app.put("/Blog/:id" , async (req,res)=> {
    try{
        const {id}= req.params;
        const {title, author, description, tag, category} = req.body
        const blogs = await Blog.findByIdAndUpdate(id, {title, author, description,tag, category}, {runValidators:true});
        
        
 console.log("id from req params is", id)
 console.log("form req.body", req.body);
 console.log("req.files:", req.files)

  const imagesArray = req.files.map((obj)=> ({
    url:obj.path,
    filename:obj.filename,

  }))
   const edittedBlog = await Product.findByIdAndUpdate(id,{name, price, description, image, category}, {runValidator:true});
   edittedBlog.image.push(...imagesArray)
  await edittedBlog.save()




const { deleteImages } = req.body;

if (!deleteImages || deleteImages.length === 0) {
  // return res.status(400).json({ success: false, message: 'No images to delete' });
}

try {
  // Delete images from Cloudinary
  for (let filename of deleteImages) {
    await cloudinary.uploader.destroy(filename);
  }

  // Remove deleted images from the product's images array in the database
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { $pull: { image: { filename: { $in: deleteImages } } } },
    { new: true }  // Return the updated document
  );

  if (!updatedProduct) {
    // return res.status(404).json({ success: false, message: 'Product not found' });
  }

  // return res.status(200).json({ success: true, message: 'Images deleted successfully' });
} catch (error) {
  console.error('Error deleting images:', error);
  // console.log( res.status(500).json({ success: false, message: 'Failed to delete images' }));
}

        res.redirect(`/Blog/${blogs.id}`)
    } catch(e) {
        res.status(500).send('Error occurred'); 
        console.log(e)  
    }

 
})


// Delete: delete blog post entirely
app.delete("/Blog/:id", async(req, res)=> {
    try{
        const {id} =req.params
        const blogs= await Blog.findByIdAndDelete(id)
        res.redirect("/Blog")
    }catch(e){
        res.status(500).send('Error occurred'); 
        console.log(e)    
    }
    
})





// DATABASE CONNECTION
mongoose.connect("mongodb://localhost:27017/blog", {
   
})
.then(()=> {
    console.log("Connected to MongoDB")
}).catch((error)=> {
    console.error("Failed to connect to MongoDB", error)
})

app.listen(PORT, (req, res)=> {
    console.log(`Server is runing on http://localhost:${PORT}`)
})

// SUMMARY
// Full crud blog application with mongoose ans it model , ejs as it view engine and mongodb as it database.
// IN CONCLUSION USED THIS AS AN EXAMPLE IN MAKING A FULL FUNCTIONAL CRUD APPLICATION WITH FITERING MODIFICATION. 