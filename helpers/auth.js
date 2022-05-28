const jwt=require('jsonwebtoken');


function authenticate(req,res,next){

// const token= req.header('x-auth-token');

// if(!token) return res.status(400).send("no token provided");

// try{

// const decoded=jwt.verify(token,process.env.jwt-secret)
// if(req.user=decoded){

// }
// }catch(e){
//     console.log(e)
// }


 if(req.headers.authorization){

try{
     jwt.verify(req.headers.authorization,process.env.jwt_secret,function(err,decoded){

        if(decoded==undefined ){

            res.status(401).json({message:"Unauthorized"});
   
        }else{
   
            next()
        }

     });

    
    }catch(e){

        console.log(e)
    }
     

 }else{
     res.status(401).send("notokenprovided")
 }

}

module.exports={authenticate}