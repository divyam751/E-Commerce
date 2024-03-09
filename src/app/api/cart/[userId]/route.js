import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/connectDB";
import CartModule from "@/models/cart";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

export async function GET(req, { params }) {
  try {
    const authorization = headers().get("authorization");

    if (!authorization) {
      return NextResponse.json({ msg: "Please login first!" }, { status: 401 });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { msg: "Token missing in authorization header" },
        { status: 401 }
      );
    }

    const decodedToken = jwt.verify(token, SECRET_KEY);
    console.log(decodedToken);

    if (!decodedToken) {
      return NextResponse.json({ msg: "Token not decoded" }, { status: 401 });
    }

    await dbConnect();
    const userId = params.userId;

    const res = await CartModule.findOne({ userId });

    if (!res) {
      return NextResponse.json({ msg: "Cart data not found" }, { status: 404 });
    }

    return NextResponse.json({ res, msg: "CartData" });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
