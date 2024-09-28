const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Counter = require("../models/counter");
const Inverter = require("../models/inverterPrototype")
const Blog = require("../models/blogs")
// VARIABLE
const categories = ["solar-panels", "inverters", "battery", "charge-controllers", "ac-cables", "dc-cables"]


// Home router
router.get('/',  async (req, res) => {
  const {category, tag }= req.query;

  const solarData = await Counter.find({})

  let blogs;
  let products;
  if(category){
    products= await Product.find({category})
    blogs= await Blog.find({ category})

    res.render('Genesis/home', { products, categories, solarData, blogs, category, tag:category});
  } if(tag){
    blogs =await Blog.find({tag})
   res.render('Genesis/admin', { solarData, products, categories, blogs,  category:tag, tag})
}
  
  
  else{
    products = await Product.find({})
    blogs= await Blog.find({})
   res.render('Genesis/home', { products, categories, solarData,  blogs, category:"All", tag:"All"});
 
  }
});



router.post("/", async (req, res)=>{
  const {search}= req.body
  const solarData = await Counter.find({})
  
    try {
      const products = await Product.find({
        name: { $regex: search, $options: 'i' }  // Case-insensitive search
      });
  
      res.render("Genesis/home", {products, solarData, categories})
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  

  
  })

  router.post("/calculate-power-load", async (req, res) => {

   
    const { devices } = req.body;

    if (!Array.isArray(devices)) {
        return res.status(400).send('Devices must be an array');
    }

    let totalPowerLoad = 0;

    devices.forEach(device => {
        if (device.power && device.quantity) {
            totalPowerLoad += device.power * device.quantity;
        } else {
            return res.status(400).send('Each device must have power and quantity fields');
        }
    });

    try {
        const recommendedInverter = await Inverter.findOne({ maxLoad: { $gte: totalPowerLoad } }).sort({ maxLoad: 1 });

        if (!recommendedInverter) {
            return res.status(404).send('No suitable inverter found');
        }

        res.render('Genesis/inverter/result', { totalPowerLoad, recommendedInverter });
    } catch (error) {
        res.status(500).send(error.message);
    }

  })







module.exports = router;
