import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
const app = express();


dotenv.config();
app.get("/",(req, res)=>{
    res.send("The server is running bro123");
});
console.log(process.env.MONGODB_URL);
app.listen(5000, ()=>{
    connectDB();
    console.log("Hello World");
});

