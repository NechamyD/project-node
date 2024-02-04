import mongoose from "mongoose";
import  jwt  from "jsonwebtoken";
const UserSchema=mongoose.Schema({
    UserName:String,
    password:String,
    email:{type:String,unique:true},
    role:{type:String,default:"USER"},
    dateRegistration:{type:Date ,default:Date.now()}
   
})
export const userModel=mongoose.model("user",UserSchema);
export const userValidator=async (_user)=>{
    const userValidationSchema=Joi.object({
       
        UserName:Joi.string().min(2).max(13).required(),
        password:Joi.string().required(),
        email:Joi.string().required(),
        role:Joi.string(),
        dateRegistration:Joi.date()
        


        
    })
    return userValidationSchema.validate(_user);
}
export const generateToken=(_id,UserName,role)=>{
    let token=jwt.sign({_id,UserName,role},
        process.env.SECRET_JWT,{
            expiresIn:"1h"
        });
        return token;

}
