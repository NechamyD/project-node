import mongoose from "mongoose"
import { productModel,productvalidator } from "../Models/Product.js"
export const getAllProducts= async(req,res,next)=>{
    let txt=req.query.txt || undefined;
    let page=req.query.page||1;
    let perPage=req.query.perPage||15;
    try{
        let allProducts=await productModel.find(
            {$or:
            [{name:txt},{descreption:txt}]}
        ).skip((page-1)*perPage).limit(perPage);
        //pagination
        res.json(allProducts);
    }
    catch(err){
res.status(400).json({type:"invalid operation",message:"sorry cannot get products"})
    }
}
export const getProductById=async(req,res)=>{
    let {id}=req.params;
    try{
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({type:"no valid id",message:"id not in right format"});
        }
        let product=await productModel.findById(id);
        if(!product)
        return res.status(404).json({type:"no id",message:"no product with such id"});
    return res.json(product);
    }
    catch(err){
        console.log(err)
        res.status(400).json({type:"invalid operation", message:"sorry cannot get product"})

    }
}
export const deleteProduct=async (req, res)=>{
    let {id}=req.params;
    try{
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({type:"no valid id",message:"id not in right format"});
        }
        let product=await productModel.findByIdAndDelete(id);
        if(!product)
        return res.status(404).json({type:"no course to delete",message:"no product with such id to delete"});
    if(req.user.role!="ADMIN"&&product.codeDoubt!=req.user._id){
        res.status(403).json({type:"not allowed",message:"tou are not allowed to delete product only manager or if you are the dubt"})
       
    }
    // product=await productModel.findByIdAndDelete(id);
    return res.json(product);
    }
    catch(err){
        console.log(err)
        res.status(400).json({type:"invalid operation", message:"sorry cannot delete product"})

    }

}
export const addProduct=async(req,res)=>{
    
    let{name,price,descreption,manufactingDate,codeDoubt}=req.body;
   
    const result= await productvalidator(req.body);
    console.log(result)
    if(result.error)
    res.status(400).json({type:"invalid data",message:result.error
.details[0].message})
try{
    let sameProduct=await productModel.findOne({name:name});
    if(sameProduct)
    return res.status(409).json({type:"same detailes",message:"there is already same product"})
let newProduct=new productModel({name,price,descreption,manufactingDate,codeDoubt});
await newProduct.save();
return res.json(newProduct);
}
catch(err){
    console.log(err);
    res.status(400).json({type:"invalid operation",message:"sorry cannot add product"})

}
    
}
export const updateProduct=async(req,res)=>{
    let {id}=req.params;
    try{
        if(!mongoose.isValidObjectId(id)){
            res.status(400);
            return res.status(400).json({type:"no valid id",message:"id not in right format"});
        }
        let product=await productModel.findById(id);
        if(!product)
        return res.status(404).json({type:"product not found",message:"no product with such id to update"});
    if(req.user.role!="ADMIN"){
        res.status(403).json({type:"not allowed",message:"you are not allowed to update  product only manager or if you are the dubt"})
    }
    let updated=await productModel.findByIdAndUpdate(id,req.body,{new:true})
   
    return res.json(updated);
    }
    catch(err){
        console.log(err)
        res.status(400).json({type:"invalid operation", message:"sorry cannot update product"})

    }
}