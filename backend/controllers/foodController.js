import foodModel from "../models/foodModel.js";
import redisClient from "../config/redis.js";
import fs from 'fs';

// --- ADD FOOD ITEM ---
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        // Delete the Redis key so the next 'list' call hits the database
        await redisClient.del('all_products'); 
        res.json({ success: true, message: "Food Added Successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error adding food" });
    }
}

// --- LIST FOOD ITEMS ---
const listFood = async (req, res) => {
    try {
        const cachedProducts = await redisClient.get('all_products');

        if (cachedProducts) {
            return res.json({ success: true, data: JSON.parse(cachedProducts), source: 'cache' });
        }

        const foods = await foodModel.find({});
        // Cache data for 1 hour
        await redisClient.setEx('all_products', 3600, JSON.stringify(foods));

        res.json({ success: true, data: foods, source: 'database' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// --- REMOVE FOOD ITEM ---
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (food) {
            // Remove local file
            fs.unlink(`uploads/${food.image}`, () => {});
            await foodModel.findByIdAndDelete(req.body.id);
            
            // Invalidate Redis cache
            await redisClient.del('all_products'); 
            
            res.json({ success: true, message: "Food Removed" });
        } else {
            res.json({ success: false, message: "Food not found" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error removing food" });
    }
}

export { addFood, listFood, removeFood };