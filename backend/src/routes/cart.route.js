import express from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cart.controller.js";
import { protect } from "../middleware/protect.middleware.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.delete("/:id", protect, removeFromCart);

export default router;