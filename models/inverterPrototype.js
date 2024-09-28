// REQUIRING MOGOOSE
const mongoose = require ("mongoose");

// CREATING SCHEMA
const inverterSchema = new mongoose.Schema({
    model:String,
    maxLoad: Number,
    description: String,
    price: Number,


})

// COMPILING OUR MODEL
const Inverter =mongoose.model("Inverter", inverterSchema)


// EXPORTING FROM FILE
module.exports = Inverter




