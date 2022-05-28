
const mongoose=require('mongoose');
const Joi = require('joi');

const User=mongoose.model('User',new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    mobileno:{
        type:String,

    },
    password:{
        type:String,
        required:true,
       
    },
    address:{
        type:String,
        

    }
}));


async function validator(user){
   
try{
const schema=Joi.object({
        name:Joi.string().required().min(3),
        email:Joi.string().required().email(),
        password:Joi.string().required()


})
 return await schema.validateAsync(user)

}catch(e){
    console.log(e)
}

}


exports.validator=validator;

exports.User=User;
