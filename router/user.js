const express= require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const {User,validator} =require('../model/usermodel');
const { trusted } = require('mongoose');
const Joi=require('joi');
const jwt=require('jsonwebtoken');
const _ =require('lodash');
const env=require('dotenv').config();



router.get('/',async(req,res)=>{
    try{
    const user=await User.find().sort('name')
    res.send(user)}
    catch(e){
        console.log(e)
    }

});

router.post('/register',async (req,res)=>{
    const exist=await User.findOne({email:req.body.email
    })
    if (exist) return res.status(422).send("email already exist");

    try{

    const {error}=await validator(req.body);
    if(error) {
    return res.status(400).send(error.details[0].message)

    }else{
        try{

            const salt=await bcrypt.genSalt(10);
            const pass=await bcrypt.hash(req.body.password,salt)

    let  user=new User({
        name:req.body.name,
        email:req.body.email,
        password:pass
        
    })

    let final= await user.save()

   res.send(final);
}
    catch(e){
        console.log(e);
    }
}}catch(e){
    console.log(e)
}


})
router.post('/login',async(req,res)=>{
    try{

    const { error }= valid1(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const exist=await User.findOne({email:req.body.email
    })
    if (!exist) return res.status(422).send("user not exist");

    const validpass=await bcrypt.compare(req.body.password,exist.password)

    if(!validpass) return res.status(400).send("invalid password")

   const token= jwt.sign({name:exist.name,email:exist.email},process.env.jwt_secret,{expiresIn:'3h'})

    res.header('x-auth-token',token).send(_.pick(exist,['id','name','email']))}
    catch(e){
        console.log(e)
    }


})




async function valid1(user){
    try{
        const schema=Joi.object({
                email:Joi.string().required().email(),
                password:Joi.string().required()    
        })
         return await schema.validateAsync(user)
        
        }catch(e){
            console.log(e)
        }
}





module.exports= router;