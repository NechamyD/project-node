import {generateToken,userModel} from"../Models/User.js" ;
import bcrypt from"bcryptjs";

export const addUser=async (req,res)=>{
    let {email, password,userName}=req.body;
    
    if(!email||!password||!userName)
    return res.status(404).json({type:"missing parameters",message:"please send email user name and password"})
try{
    const sameUser=await userModel.findOne({email:email})
    if(sameUser)
    return res.status(409).json({type:"same user",message:"user with such email already exists"})
let hashedPassword=await bcrypt.hash(password,10);
let newUser=new userModel({UserName:userName,email,password:hashedPassword});
await newUser.save();
let token=generateToken(newUser._id,newUser.UserName,newUser.role);
console.log(token);
return res.json({_id:newUser._id,UserName:newUser.UserName,token,email:newUser.email
})
}
catch(err){
    return   res.status(400).json({type:"invalid operation",message:"cannot add user"})

}

}
export const login=async(req,res)=>{
    let {email,password}=req.body;
    if(!email||!password)
    return res.status(404).json({type:"missing parameters",message:"please send email and password"})
try{
    const user=await userModel.findOne({email:email})
    if(!user)
        return res.status(404).json({type:"no user",message:"one or more detailes are invalid"});
    if(! await bcrypt.compare(password,user.password))
        return res.status(404).json({type:"no user",message:"user password is invalid"})
    let token=generateToken(user._id,user.UserName,user.role);
    return res.json({_id:user.id,UserName:user.UserName,token,email:user.email})
}
catch(err){
    res.status(400).json({type:"invalid operation",message:"cannot sign in user"})
}

}
export const getAllUsers=async(req,res)=>{
    // let txt=req.query.txt || undefined;
    let page=req.query.page||1;
    let perPage=req.query.perPage||5;
   
        
        
    try{
    //      if(req.user.role!="ADMIN"){
    //     res.status(403).json({type:"not allowed",message:"you are not allowed to get all the users only manager or if you are the dubt"})
    // }
        let allUsers=await userModel.find({},"-password").skip((page-1)*perPage).limit(perPage);;
        res.json(allUsers);
    }
    catch(err){
        res.status(400).json({type:"invalid operation",message:"cannot get all users"});

    }

}