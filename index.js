const express=require('express');
const mongoose=require('mongoose');
const app=express();
const user=require('./router/user');
const env=require('dotenv').config();
const product=require('./router/product')


mongoose.connect(process.env.DB,{useNewurlparser:true,useUnifiedTopology:true})
.then(()=>{console.log("Connected succssfully")})
.catch((e)=>{console.log(e)})

app.use(express.json());
app.use('/user',user);
app.use('/product',product);
const port=process.env.port || 3000;

app.listen(port,()=>{
    console.log(`app running on ${port}`);
})
