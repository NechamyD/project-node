import mongoose from "mongoose"
import { orderModel,ordervalidator } from "../Models/Order.js"
import jwt from "jsonwebtoken";

export const getAllOrders= async(req,res)=>{
    let txt=req.query.txt || undefined;
    let page=req.query.page||1;
    let perPage=req.query.perPage||5;
    try{if(req.user.role!="ADMIN")
        res.status(403).json({type:"not allowed",message:"tou are not allowed to delete product only manager or if you are the dubt"})
        let allOrders=await orderModel.find(
            {$or:
            [{name:txt},{descreption:txt}]}
        ).skip((page-1)*perPage).limit(perPage);
        //pagination
        res.json(allOrders);
    }
    catch(err){
res.status(400).json({type:"invalid operation",message:"sorry cannot get orders"})
    }
}

export const deleteOrder=async (req, res)=>{
    let {id}=req.params;
    try{
        if(!mongoose.isValidObjectId(id)){
            res.status(400);
            return res.status(400).json({type:"no valid id",message:"id not in right format"});
        }
        let order=await orderModel.findById(id);
        if(!order)
        return res.status(404).json({type:"no order to delete",message:"no order with such id to delete"});
    if(req.user.role!="ADMIN"&&order.orderingId!=req.user._id)
        res.status(403).json({type:"not allowed",message:"you are not allowed to delete order only manager or if you are the dubt"})
    if(order.setOff)   
    res.status(403).json({type:"not allowed ",message:"you are not to delete order that set off"}) 
   
    order=await orderModel.findByIdAndDelete(id);
    return res.json(order);
    }
    catch(err){
        console.log(err)
        res.status(400).json({type:"invalid operation", message:"sorry cannot delete order"})

    }

}
export const addOrder=async (req,res)=>{
    let {orderDate,dueDate,address,products,setOff}=req.body;
    let result=await ordervalidator(req.body);
    console.log(result)
    if(result.error)
    return res.status(404).json({type:"invalid data ",message:result.error.details[0].message})


// if(!req.user)
// return res.status(404).json({type:"no order to add",message:"you cannot add order because that you unuregistered user  "})
 let orderingId=req.user._id;
 console.log(orderingId);
 
let newOrder=new orderModel({orderDate,orderingId,dueDate,address,products,setOff});
await newOrder.save();
return res.json(newOrder);

}
export const updateOrder =async(req,res)=>{
    let {id}=req.params;
    if(!mongoose.isValidObjectId(id))
    return res.status(400).json({type:"no valid id",message:"id not in right format"})
    // if(req.user.role!="ADMIN")
    // res.status(403).json({type:"not allowed",message:"you are not allowed to update order only manager "})
try{
    let order=await orderModel.findById(id);
    if(!order)
        return res.status(404)({type:"order not found",massage:"no order with such id"})
    let setOff=true;
    let updated=await orderModel.findByIdAndUpdate(id,{setOff:setOff},{new:true})//לtrue איך מעדכנים את השדרה יצא לדרך
    return res.json(updated);
    }
    catch(err){
        console.log(err)
        res.status(400).json({type:"invalid opartion",massage:
        "sorry cannot update order"})
    }
}
export const getOrdersUser= async(req,res)=>{
    // let {orderingId}=req.params;
    // let orderingId=req.user._id;
    let txt=req.query.txt || undefined;
    let page=req.query.page||1;
    let perPage=req.query.perPage||5;
    try{
       
        let allOrdersUser=await orderModel.find({orderingId:req.user._id}
       
        ).skip((page-1)*perPage).limit(perPage);
        //pagination
        res.json(allOrdersUser);
    }
    catch(err){
res.status(400).json({type:"invalid operation",message:"sorry cannot get orders"})

    }
}

//orderingDetailes:minimalUserSchema,// פרטי המזמין
// orderDate:Date,
// dueDate:Date,//תאריך יעד
// address:String,
// products:[minimalProductSchema],
// setOff:{

    
