import express from "express"
import productRouter from "./Routes/product.js"
import orderRouter from "./Routes/order.js"
import {connectToDB} from "./DB/db.js"
import cors from "cors"
import { config } from "dotenv"
import { errorHandling } from "./Middlewares/errorHandling.js"
import userRouter from "./Routes/user.js"
const app=express();
app.use(cors());
app.use(express.json());
connectToDB();
config();
app.use("/api/product",productRouter );
app.use("/api/user",userRouter);
app.use("/api/order",orderRouter);
app.use(errorHandling);
let port = process.env.PORT ||3500;
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`)
})