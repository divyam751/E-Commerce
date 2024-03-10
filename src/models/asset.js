const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  posters: {
    type: [String],
  },
  brands: {
    type: [String],
  },
  glowalbrands: {
    type: [String],
  },
  category: {
    type: [String],
  },
});

const Asset = mongoose.models.Asset || mongoose.model("Asset", assetSchema);
module.exports = Asset;
