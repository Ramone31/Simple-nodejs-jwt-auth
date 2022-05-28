
const mongoose=require('mongoose');

const Product=mongoose.model('product',new mongoose.Schema({

   product_name:{
        type:String
    },
    price:{
        type:String
    },
   
}));


exports.Product=Product;
