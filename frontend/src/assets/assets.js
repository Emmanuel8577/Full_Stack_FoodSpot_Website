import food1 from './images/rice2.png'
import food2 from './images/pizza3.png'
import food3 from './images/noodles1.png'
import food4 from './images/drink1.jpg'
import food5 from './images/chiken2.png'
import food6 from './images/pasta1.png'
import food7 from './images/pizza2.png'
import food8 from './images/noodles2.png'
import food9 from './images/rice3.png'
import food10 from './images/pizza3.png'
import food11 from './images/drink2.png'
import food12 from './images/pasta2.png'
import food13 from './images/chicken.png'
import food14 from './images/pizza2.png'
import food15 from './images/Drice1.png'
import food16 from './images/Drice2.png'
import food17 from './images/swallow1.png'
import food18 from './images/swallow2.png'
import stripe_logo from './images/stripe_logo.png'

export const categoryItem = [
    { category_title: "All" },
    { category_title: "Spaghetti" },
    { category_title: "Pizza" },
    { category_title: "Rice" },
    { category_title: "Noodles" },
    { category_title: "Chicken" },
    { category_title: "Drinks" },
];

export const assets = { stripe_logo };

export const product = [
    {
        _id: "a",
        name: "Special Fried Rice With Chicken",
        description: "A lightweight, usually knitted, pullover shirt...",
        price: 100,
        image: food1,
        category: "Rice",
        date: 1716634345448,
    },
    {
        _id: "ab",
        name: "Freshly Baked Pepperoni Pizza",
        description: "A lightweight, usually knitted, pullover shirt...",
        price: 200,
        image: food2,
        category: "Pizza",
        date: 1716621345448,
    },
    {
        _id: "ac",
        name: "Delicious Stir Fry Veggie Noodles ",
        description: "A lightweight, usually knitted, pullover shirt...",
        price: 220,
        image: food3,
        category: "Noodles",
        date: 1716234545448,
    },
    {
        _id: "ad",
        name: "Cup of Tequilla Sunrise Cocktail",
        description: "A lightweight, usually knitted, pullover shirt...",
        price: 110,
        image: food4,
        category: "Drinks",
        date: 1716621345448,
    },
    {
        _id: "ae",
        name: "Grilled Spicy Boneless Chicken",
        description: "A lightweight, usually knitted, pullover shirt...",
        price: 130,
        image: food5,
        category: "Chicken",
        date: 1716622345448,
    },
    {
        _id: "af",
        name: "Spaghetti With Shrimps and Tomato Sauce",
        description: "A lightweight, usually knitted, pullover shirt...",
        price: 140,
        image: food6,
        category: "Spaghetti",
        date: 1716623423448,
    },
    {
        _id: "ag",
        name: "Veggie Pizza With Cheese and Mushroom",
        description: "A lightweight, usually knitted, pullover shirt...",
        price: 190,
        image: food7,
        category: "Pizza",
        date: 1716621542448,
    },
    {
        _id: "ah",
        name: "Noodles With Moshroom Pepper and Peas",
        description: "A lightweight, usually knitted, pullover shirt...",
        price: 140,
        image: food8,
        category: "Noodles",
        date: 1716622345448,
    },
    {
        _id: "ai",
        name: "Rich Stir Native Fried Rice",
        description: "A lightweight, usually knitted, pullover shirt...",
        price: 100,
        image: food9,
        category: "Rice",
        date: 1716621235448,
    },
    {
        _id: "aj",
        name: "Newly Baked Peppered Pizza",
        description: "A lightweight, usually knitted, pullover shirt...",
        price: 110,
        image: food10,
        category: "Pizza", // Fixed from "Men"
        date: 1716622235448,
    },
    {
        _id: "ak",
        name: "Mojito Cocktail With Lemon Ice Cubes",
        description: "A lightweight, usually knitted, pullover shirt...",
        price: 120,
        image: food11,
        category: "Drinks",
        date: 1716623345448,
    },
    {
        _id: "al",
        name: "Stir Fried Delicious Pasta With Olive",
        description: "A lightweight, usually knitted, pullover shirt...",
        price: 150,
        image: food12,
        category: "Spaghetti",
        date: 1716624445448,
    },
    {
        _id: "am",
        name: "Crunchy Chicken Chips With Sauce",
        description: "A lightweight, usually knitted, pullover shirt...",
        price: 130,
        image: food13,
        category: "Chicken",
        date: 1716625545448,
    },
    {
        _id: "an",
        name: "Italian Style Thin Crust Pizza",
        description: "A lightweight, usually knitted, pullover shirt...",
        price: 160,
        image: food14,
        category: "Pizza", // Fixed from "Kids"
        date: 1716626645448,
    },
    {
        _id: "dr",
        name: "Delicious Rice",
        description: "A lightweight, usually knitted, pullover shirt...",
        price: 170,
        image: food15,
        category: "Rice", 
        date: 1716626645448,
    },
    {
        _id: "dri",
        name: "Delicious rice",
        description: "A lightweight, usually knitted, pullover shirt...",
        price: 180,
        image: food16,
        category: "Rice", 
        date: 1716626645448,
    },
    {
        _id: "sw",
        name: "Italian Style Thin Crust Pizza",
        description: "A lightweight, usually knitted, pullover shirt...",
        price: 190,
        image: food17,
        category: "Swallow", 
        date: 1716626645448,
    },
    {
        _id: "swa",
        name: "Italian Style Thin Crust Pizza",
        description: "A lightweight, usually knitted, pullover shirt...",
        price: 200,
        image: food18,
        category: "Swallow",
        date: 1716626645448,
    },
];

// This matches your Context import { products }
export const products = product;