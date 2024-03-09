import { dbConnect } from "@/lib/connectDB";
import UserModel from "@/models/user";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");

export async function GET(req) {
  dbConnect();
  return NextResponse.json({ msg: "SignUp Page" });
}

export async function POST(req) {
  try {
    await dbConnect();

    const { name, email, password } = await req.json();

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { msg: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();
    return NextResponse.json(
      { msg: "Account created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
