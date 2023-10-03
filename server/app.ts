require("dotenv").config();
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { errorMiddleware } from "./middleware/error";
import courseRouter from "./routes/course.route";
import userRouter from "./routes/user.route";

export const app = express();

// Body parser
app.use(express.json({ limit: "50mb" }));

// Cookie parser
app.use(cookieParser());

// Cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

// Routes
app.use("/api", userRouter);
app.use("/api", courseRouter);

// testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Hello World",
    success: true,
  });
});

// Unknown routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Error Handling middleware
app.use(errorMiddleware);
