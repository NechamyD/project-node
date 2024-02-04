import express from "express";
import {addOrder,getAllOrders,deleteOrder,updateOrder,getOrdersUser} from "../Controller/order.js"
import {auth,authAdmin} from "../Middlewares/auth.js"
const router=express.Router();
router.get("/",authAdmin,getAllOrders);
router.get("/orderUser",auth,getOrdersUser);
// router.get("/:id",getOrderById);
 router.delete("/:id",auth,deleteOrder);
router.post("/",auth,addOrder);
router.put("/:id",authAdmin,updateOrder);

export default router;