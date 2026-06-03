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
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a unique 6-character recovery key
    const recoveryKey = Math.random().toString(36).substring(2, 8).toUpperCase();

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      recoveryKey: recoveryKey, // Saved in DB
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    // Send the token AND recoveryKey back to the frontend
    res.json({ 
      success: true, 
      token, 
      recoveryKey, 
      message: "Keep your recovery key safe!" 
    });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Registration failed" });
  }
};

export const resetPassword = async (req, res) => {
  const { email, recoveryKey, newPassword } = req.body;
  try {
    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    // Verify recovery key (Case-insensitive check)
    if (user.recoveryKey !== recoveryKey.toUpperCase()) {
      return res.json({ success: false, message: "Invalid Secret Recovery Key" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update password in DB
    user.password = hashedNewPassword;
    await user.save();

    res.json({ success: true, message: "Password updated successfully! You can now log in." });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error resetting password" });
  }
};

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

export const googleAuthController = async (req, res) => {
    const { name, email, googleId } = req.body;
    try {
        let user = await userModel.findOne({ email });

        if (!user) {
            // Flow A: Completely new user registering via OAuth
            const randomPassword = Math.random().toString(36).slice(-8) + googleId.substring(0, 4);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(randomPassword, salt);
            const recoveryKey = Math.random().toString(36).substring(2, 8).toUpperCase();

            user = new userModel({
                name,
                email,
                password: hashedPassword,
                recoveryKey: recoveryKey 
            });
            await user.save();
        } else if (!user.recoveryKey) {
            // Flow B: Existing legacy user logging in but missing a recovery key
            const patchKey = Math.random().toString(36).substring(2, 8).toUpperCase();
            user.recoveryKey = patchKey;
            await user.save();
        }

        // Generate the standard security JSON Web Token session profile
        const token = createToken(user._id);
        
        res.json({ 
            success: true, 
            token, 
            recoveryKey: user.recoveryKey, 
            message: "Google Authentication successful!" 
        });

    } catch (error) {
        console.error("Google Auth Controller Error:", error);
        res.json({ success: false, message: "Error authenticating with Google account" });
    }
};
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

export { 
  loginUser, 
  adminLogin, 
  sendEmail, 
  getAllUsers, 
  getDashboardStats
};