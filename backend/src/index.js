import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from './lib/socket.js';

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
    origin: "https://hedwig-chat.vercel.app",
    credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


server.listen(PORT, () =>{
    console.log("App running on PORT: "+PORT);
    connectDB();
});