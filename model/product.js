
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({


    title:{
        type:String,
     
    },
    image:{
         type:String,
        
    },
     price :Number,
     Description:String,
 
})

module.exports = mongoose.model("Product", productSchema);