const mongoose= require("mongoose");

const PerformanceSchema = new mongoose.Schema({
    page: String,
    loadTime: Number,  // Time in milliseconds
    timestamp: { type: Date, default: Date.now }

})

const Performance=mongoose.model("Performance", PerformanceSchema);

module.exports= Performance