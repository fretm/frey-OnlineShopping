const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({


    email:{
        type:String,
     
    },
    password:{
         type:String,
        
    },
    password2:{
        type:String,
       
   },
    cart:{
        item:[{
            product:Object
            
        }]
        ,
        totalprice: Number
    }

})

module.exports = mongoose.model("User", productSchema);
