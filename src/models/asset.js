const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
});

const assetSchema = new mongoose.Schema({
  posters: {
    type: [imageSchema],
    default: [],
  },
  brands: {
    type: [imageSchema],
    default: [],
  },
  glowalbrands: {
    type: [imageSchema],
    default: [],
  },
  category: {
    type: [imageSchema],
    default: [],
  },
});

const Asset = mongoose.models.Asset || mongoose.model("Asset", assetSchema);
module.exports = Asset;
