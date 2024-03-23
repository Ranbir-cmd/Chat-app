import express from 'express';
const app = express();
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import connectToDB from './db/connectDB.js';

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Welcome")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    connectToDB();
    console.log(`Server running on port ${PORT}`)
})