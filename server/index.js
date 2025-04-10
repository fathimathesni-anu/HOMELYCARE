import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { apiRouter } from "./routes/index.js"; 

dotenv.config();

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(express.json());

app.use(cors({
  origin: ["*"], // Or specify exact domains in production
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("hello world");
});

 app.use("/api", apiRouter)

const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

