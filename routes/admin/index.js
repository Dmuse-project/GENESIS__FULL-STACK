const express = require('express');
const router = express.Router();
const Product = require('../../models/product');
const Counter = require("../../models/counter")

const Visitor = require("../../models/visitor");
const Performance = require("../../models/performance")
const Blog = require("../../models/blogs")




// VARIABLE
const categories = ["solar-panels", "inverters", "battery", "charge-controllers", "ac-cables", "dc-cables"]


router.get("/performance", async(req, res)=> {
  // Performance
 const start = Date.now();
 // Simulate page load
 setTimeout(async () => {

  
     const loadTime = Date.now() - start;
       const performances = await new Performance({ page: 'home', loadTime }).save();
       const year=performances.timestamp.getFullYear()
       const month=performances.timestamp.getMonth() + 1
       const day=performances.timestamp.getDate()
       const hour=performances.timestamp.getHours()
       const minutes=performances.timestamp.getMinutes()
       const seconds=performances.timestamp.getSeconds()
     res.render("Genesis/admin/performance", {loadTime, year,month, day, hour, minutes,seconds })
   }, Math.random() * 1000);  // Simulate random load time

})

// // ROUTING
// // Display all
// router.get("/", async (req, res)=> {
//     const {category, tag}= req.query

 

// })



// Admin route. Display all!
router.get('/', async (req, res) => {
  try {
    const { category, tag } = req.query;

    let blogs;
    const solarData = await Counter.find({})


    // Show analytics
    const visitorCount = await Visitor.countDocuments();
    const performanceData = await Performance.aggregate([
      { $group: { _id: null, avgLoadTime: { $avg: '$loadTime' } } }
    ]);
    const avgLoadTime = performanceData.length ? performanceData[0].avgLoadTime : 0;



    if (category) {
      const products = await Product.find({ category })
      blogs= await Blog.find({ category})

      res.render('Genesis/admin', { solarData, products, categories, visitorCount, avgLoadTime, blogs, category, tag:category });
    } if(tag){
      blogs =await Blog.find({tag})
     res.render('Genesis/admin', { solarData, products, categories, visitorCount, avgLoadTime, blogs,  category:tag, tag})
 }


    else {
      const products = await Product.find({})
      blogs= await Blog.find({})
      res.render('Genesis/admin', { solarData, products, categories, visitorCount, avgLoadTime, blogs, category:"All", tag:"All"});
    }
  } catch (error) {
    res.status(500).send(error.message);
  }


});

 





router.post("/", async (req, res) => {
  const { search } = req.body
  const solarData = await Counter.find({})

      // Show analytics
      const visitorCount = await Visitor.countDocuments();
      const performanceData = await Performance.aggregate([
        { $group: { _id: null, avgLoadTime: { $avg: '$loadTime' } } }
      ]);
      const avgLoadTime = performanceData.length ? performanceData[0].avgLoadTime : 0;
  
  

  try {
    const products = await Product.find({
      name: { $regex: search, $options: 'i' }  // Case-insensitive search
    });

    res.render("Genesis/admin", { products, solarData, categories,visitorCount,avgLoadTime})
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }



})




// Edit counter
router.get('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const solarData = await Counter.findById(id)
  res.render('Genesis/admin/counter/edit', { solarData });
});

// updating counter
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { installations, totalEnergy, CO2Saved } = req.body;
  const solarData = await Counter.findByIdAndUpdate(id, { installations, totalEnergy, CO2Saved }, { runValidator: true });

  res.redirect('/admin#Counter');
});

module.exports = router;
