import Joi from "joi";
import mongoose from "mongoose";


const minimalProductSchema=mongoose.Schema({
    productName:String,
    mount:Number,
})

const OrderSchema=mongoose.Schema({
    orderingId:String,// פרטי המזמין
    orderDate:{type:Date,default:Date.now()},
    dueDate:{type:Date,default:Date.now()},//תאריך יעד
    address:String,
    products:[minimalProductSchema],
    setOff:{type:Boolean,default:false}//הזמנה יצא לדרך
   
})
export const orderModel=mongoose.model("order",OrderSchema);
export const ordervalidator=(_order)=>{
    const orderValidationSchema=Joi.object(
        {orderDate:Joi.date(),
         dueDate:Joi.date(),
         orderingId:Joi.string()  ,
         address:Joi.string().min(10).max(30),
         products:Joi.array().items(Joi.object({ productName:Joi.string().min(2).max(10).required(),
            mount:Joi.number().min(1).required()})).min(1)
        
    
           
                   }
    )
    return orderValidationSchema.validate(_order);
}
