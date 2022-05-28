const express= require('express');
const router=express.Router();

const {Product} =require('../model/productmodel');


const jwt=require('jsonwebtoken');
const _ =require('lodash');
const { authenticate } = require('../helpers/auth');
const env=require('dotenv').config();



router.get('/',[authenticate],async(req,res)=>{

    try{
    const product=await Product.find().sort('name')
    res.send(product)}
    catch(e){
        console.log(e)
    }

});


router.post('/register',[authenticate],async (req,res)=>{

    let  product;
try{
    try{
      product=new Product({
        product_name:req.body.product_name,
        price:req.body.price,
    })

    console.log(product)
    }catch(e){
        console.log(e)
    }
    let final= await product.save();
    console.log(final)

   res.send(final);
}catch(e){
    console.log(e)
}

})










module.exports= router;