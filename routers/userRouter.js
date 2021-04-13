require('dotenv').config();
const router=require('express').Router();
const bcrypt=require('bcryptjs');
const User = require('../models/userModel');

router.post("/",async(req,res)=>{
const {name,email,password,passwordVerify}=req.body;
try {
    if(!name||!email||!password||!passwordVerify){
        return res.status(401).json({message:"all fields are required"});
    
    }
    if(password!==passwordVerify){
        return res.status(401).json({message:"fill the same password"});
    
    }
    const salt= await bcrypt.genSalt();
    const passwordHash=await bcrypt.hash(password,salt);
    const userData=new User({
        name,email,password:passwordHash
    });
    const savedUser=await userData.save();
    
    
    res.status(201).send(savedUser);
    
} catch (error) {
    res.status(500).send(error);
    console.log(error);
    
}
});
//login

router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
try {
    if(!email||!password){
        return res.status(401).json({message:"all fields are required"});
    
    }

    const existedUser=await User.findOne({email:email});
if(!existedUser){
    return res.status(401).json({message:"invalid user details"});

}
 const Verify=await bcrypt.compare(password,existedUser.password);
 if(!Verify){
    return res.status(401).json({message:"invalid user details"});

 }
    
 res.status(201).send('login succesfully');


} catch (error) {
    res.status(500).send('invalid user details');
    console.log(error);
    
}

});

//logout
// router.get("/logout",(req,res)=>{
//     res.cookie("token","").send('logout');
// })

//logged in 
// router.get("/loggedin",(req,res)=>{
//     const token=req.cookies.token;
//     if(!token){
//       return  res.send(false);

//     }
//     res.status(201).send(true);
    
// })








module.exports=router;