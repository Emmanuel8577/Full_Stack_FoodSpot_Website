import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import stripePackage from "stripe";

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

// --- Helper function for SMS ---
const sendSMS = async (phone, message) => {
    try {
        // This is where you connect to your gateway (Termii, Twilio, etc.)
        console.log(`Sending SMS to ${phone}: ${message}`);
    } catch (error) {
        console.error("SMS Failed:", error.message);
    }
};

// --- 1. Place Order (Cash on Delivery) ---
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD", // Explicitly set for COD path
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Clear user cart after successful placement
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// --- 2. Place Order (Stripe) ---
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe", // Explicitly set for Stripe path
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: "ngn",
                product_data: { name: item.name },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        // Add delivery fee to Stripe session
        line_items.push({
            price_data: {
                currency: "ngn",
                product_data: { name: "Delivery Fee" },
                unit_amount: 10 * 100, // Matches your delivery_fee
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment",
            customer_email: address.email,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// --- 3. Update Order Status (With Auto-Payment & SMS) ---
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        
        // 1. Find the order first to get user details
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        // 2. Build the update object
        const updateFields = { status };

        // Logic: If Admin marks as Delivered, we set payment to true automatically
        if (status === "Delivered") {
            updateFields.payment = true;
        }

        await orderModel.findByIdAndUpdate(orderId, updateFields);

        // 3. SMS Notification Logic
        const userName = order.address.firstName;
        const userPhone = order.address.phone;
        let smsMessage = "";

        switch (status) {
            case "Food Processing":
                smsMessage = `Hi ${userName}, your meal from Chuk's Kitchen is being processed and will be ready shortly!`;
                break;
            case "Out for delivery":
                smsMessage = `Great news ${userName}! Your meal is out for delivery. Get ready to eat!`;
                break;
            case "Delivered":
                smsMessage = `Hi ${userName}, your meal has been delivered. Thank you for your patronage! Enjoy your meal.`;
                break;
        }

        if (smsMessage && userPhone) {
            await sendSMS(userPhone, smsMessage);
        }

        res.json({ success: true, message: "Status updated and notification sent." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// --- 4. Verify Stripe Payment ---
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true, message: "Payment Verified" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment Failed" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// --- 5. Fetch User Orders ---
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// --- 6. Admin: Get All Orders ---
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { 
    placeOrder, 
    placeOrderStripe, 
    updateStatus, 
    userOrders, 
    allOrders, 
    verifyStripe 
};