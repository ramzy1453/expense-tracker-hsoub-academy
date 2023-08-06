import User from "@/app/models/User";
import connectDB from "@/app/libs/connectDB";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import createToken from "@/app/libs/createToken";

type Body = {
  email: string;
  password: string;
};

export async function POST(request: NextRequest) {
  await connectDB();
  const { email, password }: Body = await request.json();

  // login
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json(
      { message: "Email is incorrect" },
      { status: 404 }
    );
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return NextResponse.json(
      { message: "Password is incorrect" },
      { status: 400 }
    );
  }

  const token = await createToken(user._id.toString());

  return NextResponse.json({ user, token });
}
