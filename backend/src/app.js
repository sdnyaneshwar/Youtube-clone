import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Define the allowed origin explicitly (adjust the port if necessary)
const allowedOrigin = 'http://localhost:3000'; // Update this with your frontend URL

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, // Allow credentials (cookies)
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Import and use your routes here
import userRouter from './routes/user.routes.js';
import videoRouter from './routes/video.routes.js';
import subscriberRouter from './routes/subscription.routes.js';
import likeRouter from './routes/likes.routes.js';
import commentRouter from './routes/comment.routes.js';

app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/subscribe", subscriberRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/comment", commentRouter);

export { app };
