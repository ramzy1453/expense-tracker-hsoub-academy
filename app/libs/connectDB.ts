import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

export default async function connectDB() {
  try {
    const connection = await mongoose.connect(MONGO_URI);
  } catch (error: any) {
    console.log("Error connecting to MongoDB : ", error.message);
  }
}
