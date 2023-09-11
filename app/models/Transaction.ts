import mongoose from "mongoose";

interface Transaction {
  amount: number;
  name: string;
  userId: mongoose.Schema.Types.ObjectId;
  startDate: Date;
}

const transactionSchema = new mongoose.Schema<Transaction>({
  amount: { type: Number, required: [true, "Amount is required"] },
  name: { type: String, required: [true, "Name is required"] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  startDate: { type: Date, default: new Date() },
});

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
