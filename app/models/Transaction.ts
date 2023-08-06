import { Schema, model, models } from "mongoose";

type Transaction = {
  amount: number;
  name: string;
  userId: Schema.Types.ObjectId;
};
const transactionSchema = new Schema<Transaction>(
  {
    amount: { type: Number, required: [true, "Amount is required"] },
    name: { type: String, required: [true, "Name is required"] },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default models.Transaction || model("Transaction", transactionSchema);
