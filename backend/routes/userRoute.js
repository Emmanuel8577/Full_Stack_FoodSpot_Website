import express from 'express';
import { loginUser, registerUser, adminLogin, getAllUsers } from '../controllers/userController.js';
import { adminAuth } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin); // This will now work!
userRouter.get("/list", adminAuth, getAllUsers); 

export default userRouter;