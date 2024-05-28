import express from "express";
import MainRoute from "./IndexRoute";
import {notFound, errorHandler} from "./middlewares/ErrorHandler"
import cookieParser from "cookie-parser";

const app = express();


// Middleware
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to the Student Management System API 🚀");
});

// Routes
// Version 1 of the API
app.use("/api/v1", MainRoute);


// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;