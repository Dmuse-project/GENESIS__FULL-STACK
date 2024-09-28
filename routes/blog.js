const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Counter = require("../models/counter")

const Visitor = require("../models/visitor");
const Performance = require("../models/performance")
const Blog = require("../models/blogs")


const cloudinary = require('cloudinary').v2;
const multer =require("multer");
const {storage} = require("../cloudinary/config")
const upload =multer({storage:storage});
const dotenv = require("dotenv");


// VARIABLE
const categories=["entertainment","finances", "news","sport", "tech"]
const tag =["latest","top","trending"]


// // ROUTING
// // Display all
// router.get("/", async (req, res)=> {
//   const {category, tag}= req.query

//   let blogs;

//   if(category){
//         blogs= await Blog.find({ category})
//        res.render("Blog/index", {blogs, category, tag:category})
//   }  if(tag){
//        blogs =await Blog.find({tag})
//       res.render("Blog/index",{blogs,  category:tag, tag})
//   }
  
  
//   else{
//  blogs= await Blog.find({})
// res.render("Blog/index", {blogs, category:"All", tag:"All"})
//   }


// })



//Create: rendering new the forms
router.get("/new", (req, res)=> {

  // res.send("it worked!")
  res.render("Genesis/admin/Blog/new",{ categories, tag})
})

// Create: posting  new blog 
router.post("/",  upload.array("image"), async (req, res)=> {
  try{
  const {id, title, author, description, category, tag} = req.body;
  const blogs=  new Blog({id,title, author  , description, category, tag})
  
  const images = req.files.map((obj) => ({
      url: obj.path,
      filename: obj.filename,
    }));
  
     blogs.image= images
   
  await blogs.save();
  res.redirect(`/admin/blog/${blogs.id}`)
  }catch(e){
      res.status(500).send('Error occurred'); 
      console.log(e)
  }
  

})


// Details
router.get("/:id", async (req, res)=> {

  try{
      const {id}= req.params;
      const blogs = await Blog.findById(id)
      res.render("Genesis/admin/blog/details", {blogs})
  }catch(e){
      res.status(500).send('Error occurred'); 
      console.log(e) 
  }
 
  
})

// Updating: rendering the form
router.get("/:id/edit", async (req, res) => {
  try{
      const {id} = req.params;
      const blogs= await Blog.findById(id);
      res.render("Genesis/admin/blog/edit", {blogs, categories, tag});
  } catch(e){
      res.status(500).send('Error occurred'); 
      console.log(e) 
  }
  
 
})


// Update: posting the form
router.put("/:id" , upload.array("image"), async (req,res)=> {
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
 const edittedBlog = await Blog.findByIdAndUpdate(id,{title, author, description,tag, category}, {runValidator:true});
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
const updatedBlog= await Blog.findByIdAndUpdate(
  id,
  { $pull: { image: { filename: { $in: deleteImages } } } },
  { new: true }  // Return the updated document
);

if (!updatedBlog) {
  // return res.status(404).json({ success: false, message: 'Product not found' });
}

// return res.status(200).json({ success: true, message: 'Images deleted successfully' });
} catch (error) {
console.error('Error deleting images:', error);
// console.log( res.status(500).json({ success: false, message: 'Failed to delete images' }));
}

      res.redirect(`/admin/blog/${blogs.id}`)
  } catch(e) {
      res.status(500).send('Error occurred'); 
      console.log(e)  
  }


})


// Delete: delete blog post entirely
router.delete("/:id", async(req, res)=> {
  try{
      const {id} =req.params
      const blogs= await Blog.findByIdAndDelete(id)
      res.redirect("/admin")
  }catch(e){
      res.status(500).send('Error occurred'); 
      console.log(e)    
  }
  
})



module.exports = router;


