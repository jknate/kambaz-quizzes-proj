import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: String,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    dob: Date,
    role: String, // FACULTY, STUDENT
    loginId: String,
    section: String,
    lastActivity: String,
    totalActivity: String,
  },
  { collection: "users" }
);

export const User = mongoose.model("User", userSchema);
