import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL =
  process.env.MONGODB_URL ||
  "mongodb+srv://nkilonzo123:cmas2016@kambaz.01oixe9.mongodb.net/kambaz?retryWrites=true&w=majority";

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

export default mongoose;
