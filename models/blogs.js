const mongoose= require("mongoose");

const opts = { toJSON: { virtuals: true } };

const imageSchema = new mongoose.Schema({
    url: String,
    filename: String,
    thunbnail:String,
  });
  
  imageSchema.virtual("thumbnail").get(function () {
    return this.url.replace("/upload", "/upload/w_200");
  });

// CREATING SCHEMA
const blogSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true
    },

    createdAt:{
        type:Date,
        default: Date.now()
    },
    description:{
        type:String,
        required:true,
    },

   

    image:[imageSchema],
    

    category:{
        type: String,
        lowercase:true,
        enum:["news", "sport", "entertainment", "tech","finances"],
        trim:true,
    },

    tag:{
        type:String,
        lowercase:true,
        enum:["trending", "top", "latest" ]

    },
    content: {
        type:String,
        default: "Blog content"
    }


}, opts);

// COMPILING OUR MODEL
const Blog =mongoose.model("Blog", blogSchema);



// EXPORTING FROM FILE
module.exports=Blog;