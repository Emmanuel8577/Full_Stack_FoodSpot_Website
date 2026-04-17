import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import orderRouter from './routes/orderRoute.js';
import cartRouter from "./routes/cartRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// Initialize Connections
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// Static Folder for Image Serving
// This makes http://localhost:4000/images/filename.jpg accessible
app.use("/images", express.static('uploads'));

// API Routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use('/api/order', orderRouter);
app.use("/api/cart", cartRouter);

app.get("/", (req, res) => res.send("API Working"));

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));