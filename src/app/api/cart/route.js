import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/connectDB";
import CartModule from "@/models/cart";

export async function GET(req) {
  return NextResponse.json([], { status: 200 });
}

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const userId = body.userId;
    const newProduct = body.items[0];

    const existingCart = await CartModule.findOne({ userId });

    if (existingCart) {
      existingCart.items.push(newProduct);
      await existingCart.save();
      console.log(`New product added to the cart for userId ${userId}.`);
      const updatedCart = await CartModule.findOne({ userId });
      return NextResponse.json({ updatedCart }, { status: 200 });
    } else {
      console.log(`No cart found for userId ${userId}.`);
      const res = await CartModule.create(body);
      console.log(res);
      const updatedCart = await CartModule.findOne({ userId });
      return NextResponse.json({ updatedCart }, { status: 200 });
    }
  } catch (error) {
    console.error(`Error processing POST request: ${error.message}`);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const userId = body.userId;
    const itemIdToUpdate = body.itemId;
    const action = body.action;

    const existingCart = await CartModule.findOne({ userId });

    if (existingCart) {
      const existingItem = existingCart.items.find(
        (item) => item._id.toString() === itemIdToUpdate
      );

      if (existingItem) {
        if (action === "INC") {
          existingItem.quantity += 1;
        } else if (action === "DEC") {
          existingItem.quantity -= 1;
        } else {
          return NextResponse.json({ msg: "Invalid action" }, { status: 400 });
        }

        existingItem.quantity = Math.max(existingItem.quantity, 1);

        await existingCart.save();
        const updatedCart = await CartModule.findOne({ userId });

        return NextResponse.json({ updatedCart }, { status: 200 });
      } else {
        console.log(
          `Item ${itemIdToUpdate} not found in the cart for userId ${userId}.`
        );
        return NextResponse.json(
          { msg: "Item not found in the cart" },
          { status: 404 }
        );
      }
    }
  } catch (error) {
    console.error(`Error processing PATCH request: ${error.message}`);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const userId = body.userId;
    const itemIdToDelete = body.itemId;

    const existingCart = await CartModule.findOne({ userId });

    if (existingCart) {
      const existingItemIndex = existingCart.items.findIndex(
        (item) => item._id.toString() === itemIdToDelete
      );

      if (existingItemIndex !== -1) {
        existingCart.items.splice(existingItemIndex, 1);
        await existingCart.save();
        const updatedCart = await CartModule.findOne({ userId });

        return NextResponse.json({ updatedCart }, { status: 200 });
      } else {
        return NextResponse.json(
          { msg: "Item not found in the cart" },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        { msg: "No cart found for the user" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(`Error processing DELETE request: ${error.message}`);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}
