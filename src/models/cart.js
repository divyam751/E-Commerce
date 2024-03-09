import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  rate: { type: Number, required: true },
  count: { type: String, required: true },
});

const cartItemSchema = new mongoose.Schema({
  brand: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  description: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  image: { type: [String], required: true },
  rating: { type: ratingSchema, required: true },
  badge: { type: String, default: null },
  quantity: {
    type: Number,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [cartItemSchema],
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
