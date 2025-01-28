import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
const app = express();


dotenv.config();


app.use(express.json());//allows us to request json data in the req.body
//this is a middleware


app.get("/",(req, res)=>{
    res.send("The server is running bro123");
});

app.delete("/api/products/:id", async (req, res)=>{
    const {id} = req.params;
    console.log(id);
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if(deletedProduct == null){
            return res.status(404).json({success: false, message: "Product Not Found"});
        }
        res.status(200).json({success: true, message: "Product Deleted Successfully"});
    } catch (error) {
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
});

app.post("/api/products", async (req, res)=>{
    const product = req.body; //user will send this data
    if(!product.name||!product.price||!product.image){
        return res.status(400).json({success: false, message: "Please provide all fields!"});
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.error("Error in Creating Project:", error.message);
        res.status(500).json({success: false, message: "Server Error"}); //500 means internal server error
    }
});

console.log(process.env.MONGODB_URL);
app.listen(5000, ()=>{
    connectDB();
    console.log("Hello World");
});

