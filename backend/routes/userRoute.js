import express from 'express';
import { loginUser, registerUser, adminLogin,googleAuthController, getAllUsers, resetPassword } from '../controllers/userController.js';
import { adminAuth } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin); 
userRouter.post("/google-auth", googleAuthController);
userRouter.post("/reset-password", resetPassword);
userRouter.get("/list", adminAuth, getAllUsers); 

export default userRouter;