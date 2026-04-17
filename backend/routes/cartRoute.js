import express from "express";
import { addToCart, updateCart, getCart, clearCart } from "../controllers/cartController.js";
// Change authMiddleware to authUser here
import { authUser } from "../middleware/auth.js"; 

const cartRouter = express.Router();

// Use authUser as the middleware for all routes
cartRouter.post("/get", authUser, getCart);
cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/update", authUser, updateCart);
cartRouter.post("/clear", authUser, clearCart); 

export default cartRouter;