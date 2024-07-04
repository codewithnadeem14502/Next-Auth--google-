import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, select: false },
  googleId: { type: String },
  image: { type: String },
  
  // isverified: { type: Boolean, default: false },
});

// Use a function to get or create the User model
export function getUser() {
  return mongoose.models.User || mongoose.model("User", userSchema);
}
