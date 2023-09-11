import bcrypt from "bcryptjs";
import User from "@/app/models/User";
import connectDB from "@/app/libs/connectDB";
import createToken from "@/app/libs/createToken";
import { NextRequest, NextResponse } from "next/server";

interface Body {
  username: string;
  email: string;
  password: string;
  confirmationPassword?: string;
}
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body: Body = await request.json();
    if (body.password !== body.confirmationPassword)
      return NextResponse.json(
        { message: "Password and confirmation password must be the same" },
        { status: 400 }
      );
    delete body.confirmationPassword;

    const hashedPassword = await bcrypt.hash(body.password, 12);

    const user = await User.create({
      ...body,
      password: hashedPassword,
    });

    const token = await createToken(user._id.toString());
    return NextResponse.json({ user, token });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
