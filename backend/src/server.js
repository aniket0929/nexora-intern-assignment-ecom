import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js"
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"
import checkoutRoutes from "./routes/checkout.route.js"
import { connectDb } from "./lib/db.js";

dotenv.config();
const app=express();

//allow us to extract json data out of body
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes)
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`);
  connectDb();
})