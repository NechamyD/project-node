import express from "express";
import {addProduct,getAllProducts,getProductById,deleteProduct,updateProduct} from "../Controller/product.js"
import {auth,authAdmin} from "../Middlewares/auth.js"

const router=express.Router();
router.get("/",getAllProducts);
router.get("/:id",getProductById);
router.delete("/:id",authAdmin,deleteProduct);
router.post("/",authAdmin,addProduct);
router.put("/:id",authAdmin,updateProduct);

export default router;












