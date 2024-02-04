import express from "express";
import {addUser,getAllUsers,login} from "../Controller/user.js";
import {authAdmin} from "../Middlewares/auth.js"
const router=express.Router();
router.get("/",authAdmin,getAllUsers);
router.post("/",addUser);
router.post("/login",login);

export default router;












