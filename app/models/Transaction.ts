import { Schema, model, models } from "mongoose";

type Transaction = {
  amount: number;
  name: string;
  userId: Schema.Types.ObjectId;
  startDate: Date;
  endDate: Date;
};
const transactionSchema = new Schema<Transaction>({
  amount: { type: Number, required: [true, "Amount is required"] },
  name: { type: String, required: [true, "Name is required"] },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  startDate: { type: Date, default: new Date() },
  endDate: { type: Date, default: new Date() },
});

export default models.Transaction || model("Transaction", transactionSchema);
