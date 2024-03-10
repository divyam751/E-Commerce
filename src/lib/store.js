import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import assetSlice from "./features/assetSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      assets: assetSlice,
      products: productSlice,
    },
  });
};
