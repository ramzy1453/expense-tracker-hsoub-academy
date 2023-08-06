import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/libs/connectDB";
import Transaction from "@/app/models/Transaction";

interface Params {
  id: string;
}

interface Body {
  amount: number;
  name: string;
}
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await connectDB();
    const transaction = await Transaction.findById(params.id);
    return NextResponse.json(transaction);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await connectDB();
    const { name, amount }: Body = await request.json();
    const transaction = await Transaction.findByIdAndUpdate(
      params.id,
      { name, amount },
      { new: true }
    );
    return NextResponse.json(transaction);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await connectDB();
    await Transaction.findByIdAndDelete(params.id);
    return NextResponse.json({
      message: "Deleted transaction successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
