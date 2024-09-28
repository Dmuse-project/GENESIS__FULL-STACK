const express = require('express');
const router = express.Router();
const Product = require('../../models/product');
const Counter = require("../../models/counter")
const {v4: uuidv4} = require("uuid");

const cloudinary = require('cloudinary').v2;
const multer =require("multer");
const {storage} = require("../../cloudinary/config")
   
const upload =multer({storage:storage});

// // VARIABLE
const categories = ["solar-panels", "inverters", "battery", "charge-controllers", "ac-cables", "dc-cables"]



// Render form to create new product.
router.get('/new', async (req, res) => {
  const products = await Product.find({})
  res.render('Genesis/admin/products/new', {categories, products})
});

// Posting new product
router.post('/', upload.array("image"), async (req, res) => {
  const {id}= req.params
  const { name, price, description,  category } = req.body;


  const product = new Product( { id, name, price, description, category, id, }, {runValidator:true});
   if(!product._id){
    product._id = uuidv4();
   }

   const images = req.files.map((obj) => ({
    url: obj.path,
    filename: obj.filename,
  }));

   product.image= images
 

  await product.save()
  res.redirect(`/admin/product/${product.id}`);

});


// Details page!
router.get("/:id",  async(req, res)=> {
  const {id}= req.params;
  const product = await Product.findById(id)
  res.render("Genesis/admin/detail", {product}) 
})

// Rendering Edit form.
router.get("/:id/edit", async(req, res)=> {

  const {id} = req.params;

  const product= await Product.findById(id)

  res.render("Genesis/admin/products/edit", {categories, product})
})

// Upadte Product
router.put("/:id", upload.array("image"), async(req, res) => {
  const {id} = req.params;
  const {name, price , description, image, category} =req.body
  const trimCategory= category.trim();
 

 console.log("id from req params is", id)
 console.log("form req.body", req.body);
 console.log("req.files:", req.files)

  const imagesArray = req.files.map((obj)=> ({
    url:obj.path,
    filename:obj.filename,

  }))
   const edittedProduct = await Product.findByIdAndUpdate(id,{name, price, description, image, category}, {runValidator:true});
   edittedProduct.image.push(...imagesArray)
  await edittedProduct.save()




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

  res.redirect("/admin#PRODUCT")
})

// Delete Product
router.delete("/:id", async(req, res)=> {
  const {id} =req.params
  const product= await Product.findByIdAndDelete(id)
  res.redirect("/admin#PRODUCT")

})


module.exports = router;






