import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/connectDB";
import AssetModule from "@/models/asset";

export async function GET(req) {
  try {
    await dbConnect();

    const res = await AssetModule.find();

    if (!res) {
      return NextResponse.json({ msg: "Data not found" }, { status: 404 });
    }

    return NextResponse.json({ res });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    const { posters, brands, glowalbrands, category } = req.body;
    const newAsset = new AssetModule({
      posters,
      brands,
      glowalbrands,
      category,
    });
    const savedAsset = await newAsset.save();

    return NextResponse.json(
      { savedAsset, msg: "Asset successfully added" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
