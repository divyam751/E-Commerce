import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  rate: { type: Number, required: true },
  count: { type: String, required: true },
});

const productsSchema = new mongoose.Schema({
  brand: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  description: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  image: { type: [String], required: true },
  rating: { type: ratingSchema, required: true },
  badge: { type: String, default: null },
});

const Products =
  mongoose.models.Products || mongoose.model("Products", productsSchema);

export default Products;
