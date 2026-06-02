import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import orderRouter from './routes/orderRoute.js';
import cartRouter from "./routes/cartRoute.js";
import axios from 'axios';

const app = express();
const port = process.env.PORT || 4000;


const RENDER_EXTERNAL_URL = "https://foodspot-backend.onrender.com/health";

// Initialize Connections
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
// backend/server.js
app.use(cors({
  origin: [
    "https://food-spot-two.vercel.app",
    "https://foodspot-admin-omega.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174" // for local testing
  ],
  credentials: true
}));

// Static Folder for Image Serving
// This makes http://localhost:4000/images/filename.jpg accessible
app.use("/images", express.static('uploads'));

// API Routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use('/api/order', orderRouter);
app.use("/api/cart", cartRouter);


app.get("/health", (req, res) => {
  res.status(200).send("Server is awake and healthy!");
});

app.get("/", (req, res) => res.send("API Working"));

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));


const keepAlive = () => {
  setInterval(async () => {
    try {
      const response = await axios.get(RENDER_EXTERNAL_URL);
      console.log(`Self-ping successful: ${response.status} at ${new Date().toISOString()}`);
    } catch (error) {
      console.error(`Self-ping failed: ${error.message}`);
    }
  }, 840000); // 14 minutes in milliseconds
};

// Only run this in production (on Render)
if (process.env.NODE_ENV === 'production') {
  keepAlive();
}