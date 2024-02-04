import Joi from "joi";
import mongoose from "mongoose";
const productSchema=mongoose.Schema({
    name:{type:String},
    price:Number,
    descreption:String,
    manufactingDate:{type:Date ,default:Date.now()},
    codeDoubt:String,
    img:String
})
export const productModel=mongoose.model("product",productSchema);

export const productvalidator=(_product)=>{
const productValidationSchema=Joi.object(
    {
        name:Joi.string().min(3).max(10).required(),
        price:Joi.number().min(0).max(10000).required(),
        descreption:Joi.string(),
        manufactingDate:Joi.date(),
        codeDoubt:Joi.string(),
        img:Joi.string()
    }
)
return productValidationSchema.validate(_product);}