import mongoose from "mongoose";

interface User {
  username: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<User>(
  {
    username: { type: String, required: [true, "Username is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please fill a valid email address",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters long"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
