import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import orderModel from "../models/orderModel.js";
import foodModel from "../models/foodModel.js"; // Added this for stats
import bcrypt from "bcrypt";
import validator from "validator";
import { Resend } from 'resend';



const resend = new Resend(process.env.RESEND_API_KEY);

// Function to create JWT Token for Users
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// --- USER REGISTRATION ---
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log("Attempting register for:", email); // Debug Log 1
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password (min 8 characters)" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();
        console.log("User saved! Creating token...");
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// --- USER LOGIN ---
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// --- ADMIN LOGIN (Added this back!) ---
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // CRITICAL: We must include the email in the payload so adminAuth can verify it
            const token = jwt.sign({ email }, process.env.JWT_SECRET); 
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid admin credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// --- GET ALL USERS ---
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}).select("-password");
        // Change 'users' to 'data' to match your frontend logic
        res.json({ success: true, data: users }); 
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// --- DASHBOARD STATS ---
const getDashboardStats = async (req, res) => {
    try {
        const userCount = await userModel.countDocuments();
        const foodCount = await foodModel.countDocuments();
        const orders = await orderModel.find({ payment: true });
        const totalRevenue = orders.reduce((total, item) => total + item.amount, 0);

        res.json({
            success: true,
            stats: {
                users: userCount,
                products: foodCount,
                revenue: totalRevenue,
                recentOrders: orders.slice(-5).reverse()
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

const sendEmail = async (req, res) => {
    const { userEmail, subject, message } = req.body;
    const file = req.file; // From Multer

    try {
        await resend.emails.send({
            from: "Chuk's Kitchen <orders@yourdomain.com>",
            to: userEmail,
            subject: subject,
            html: `<p>${message}</p>`,
            attachments: file ? [{ filename: file.originalname, content: file.buffer }] : []
        });
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// adminAuth is removed from here because it's in middleware/auth.js
export { loginUser, registerUser, adminLogin, sendEmail, getAllUsers, getDashboardStats };