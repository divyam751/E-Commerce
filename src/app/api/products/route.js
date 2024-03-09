import { NextResponse } from "next/server";
import ProductsModel from "@/models/products";
import { dbConnect } from "@/lib/connectDB";

export async function GET(req) {
  dbConnect();
  const data = await ProductsModel.find();
  return NextResponse.json({ data: data }, { status: 200 });
}
export async function POST(req) {
  return NextResponse.json({ msg: "Successful post request" }, { status: 201 });
}
export async function PUT(req) {
  return NextResponse.json({ msg: "Product delete request" }, { status: 200 });
}
export async function DELETE(req) {
  return NextResponse.json({ msg: "Product delete request" }, { status: 200 });
}
