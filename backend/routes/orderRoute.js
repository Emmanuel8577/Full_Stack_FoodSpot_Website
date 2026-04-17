import express from 'express';
import { placeOrder, placeOrderStripe, userOrders, allOrders, updateStatus, verifyStripe } from '../controllers/orderController.js';

// Import BOTH from your auth.js file
import { authUser, adminAuth } from '../middleware/auth.js'; 

const orderRouter = express.Router();

// Admin Features
orderRouter.get("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus); 

// User Features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/userorders", authUser, userOrders);

// Verify payment
orderRouter.post("/verifyStripe", verifyStripe);

export default orderRouter;