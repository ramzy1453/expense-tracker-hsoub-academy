import mongoose from "mongoose";

// const MONGO_URI = "mongodb://127.0.0.1:27017/expanse-tracker";
const MONGO_URI = process.env.MONGO_URI as string;
export default async function connectDB() {
  return await mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Failed to connect to MongoDB");
    });
}
