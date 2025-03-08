// src/server.ts
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import notesRoute from "./routes/notes";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || "";
if (!mongoURI) {
  console.error("Error: MONGODB_URI not defined in .env file");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Basic route for testing
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Shreddboard API");
});

// TODO: Import and use the notes routes
app.use("/api/notes", notesRoute);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
