const mongoose = require ("mongoose");

// STEP 2:SCHEMA
const VistorSchema= new mongoose.Schema({
    ip: String,
    userAgent:String,
    path: String,
    timestamp: { type: Date, default: Date.now }



}) 

// STEP 3:COMPILE OUR MODEL
const Vistior = mongoose.model("Visitor", VistorSchema);

// EXPORT FROM FILE
module.exports= Vistior;
