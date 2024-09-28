const mongoose = require("mongoose");


// STEP 2: SCHEMA
const counterSchema = new mongoose.Schema({

    installations: {
        type:Number,
        min:0,
        required:true
    },
    totalEnergy:{
        type:Number,
        min:0,
        required:true
    },
    
    CO2Saved:{
        type:Number,
        min: 0,
        required:true
    }

})


// STEP 3:COMPILE OUR MODEL
const Counter =mongoose.model("Counter", counterSchema)

// EXPORT FROM FILE
module.exports= Counter; 