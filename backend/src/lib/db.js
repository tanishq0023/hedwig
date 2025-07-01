import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongodb connected : ${mongoose.connection.host}`);
    }
    catch(error){
        console.log(`Connection Error : ${error}`);
    }
};