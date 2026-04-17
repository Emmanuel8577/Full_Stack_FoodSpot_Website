import jwt from 'jsonwebtoken';

// For regular users (Cart/Orders)
const authUser = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) return res.json({ success: false, message: 'Not Authorized. Login Again' });
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) return res.json({ success: false, message: "Not Authorized. Login Again." });

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        // Ensure you logged in through adminLogin controller which sets the email
        if (token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.json({ success: false, message: "Not Authorized. Restricted to Admins." });
        }
        next();
    } catch (error) {
        res.json({ success: false, message: "Token Invalid" });
    }
}

export { authUser, adminAuth };