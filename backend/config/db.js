import mongoose from "mongoose";

const connectDB = async () => {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        console.error("❌ MONGODB_URI is not defined in .env file");
        process.exit(1); 
    }

    try {
        mongoose.connection.on('connected', () => {
            console.log("✅ MongoDB Connected Successfully");
        });

        // Added /food-del to specify the database name
        await mongoose.connect(`${uri}/food-del`);
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

export default connectDB;