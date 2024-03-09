import { dbConnect } from "@/lib/connectDB";
import UserModel from "@/models/user";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

export async function POST(req) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return NextResponse.json({ msg: "Wrong credentials" }, { status: 401 });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return NextResponse.json({ msg: "Wrong credentials" }, { status: 401 });
    }

    const token = jwt.sign({ email: existingUser.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return NextResponse.json(
      { token: token, userId: existingUser._id, msg: "Login successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
