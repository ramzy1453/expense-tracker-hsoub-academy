import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/libs/connectDB";
import Transaction from "@/app/models/Transaction";

interface Body {
  amount: number;
  name: string;
  startDate: Date;
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const userId = request.cookies.get("userId")?.value;
    const transactions = await Transaction.find({ userId });
    return NextResponse.json(transactions);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { name, amount, startDate }: Body = await request.json();

    const userId = request.cookies.get("userId")?.value;

    const transaction = await Transaction.create({
      name,
      amount,
      startDate,
      userId,
    });

    return NextResponse.json(transaction);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const userId = request.cookies.get("userId")?.value;

    await Transaction.deleteMany({ userId });

    return NextResponse.json({
      message: "Deleted all transactions successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
