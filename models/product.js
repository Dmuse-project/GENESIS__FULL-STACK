/////////////////////////////
// STEP 1: PRODUCT MODEL

const mongoose= require("mongoose");
const {v4: uuidv4} = require("uuid");


  const opts = { toJSON: { virtuals: true } };

const imageSchema = new mongoose.Schema({
  url: String,
  filename: String,
  thunbnail:String,
});

imageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});


//  STEP 2: SCHEMA
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    price: {
        type:Number,
        required:true,
        min:0

    },

    description:{
        type:String,
        // default:"product description"
       
    },

    image:[imageSchema],

    category: {
        type:String,
        enum: ["solar-panels", "inverters", "battery", "charge-controllers", "ac-cables", "dc-cables"],
         trim: true,
    },

    _id:{
        type:String,
        // default:uuidv4()
    },
     instock:Boolean,
   
 
}, opts)


// STEP 3: COMPILE OUR MODEL
const Product = mongoose.model("Product", productSchema);

// EXPORT FROM FILE
module.exports=Product;    
