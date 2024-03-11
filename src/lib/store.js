import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import assetSlice from "./features/assetSlice";
import userSlice from "./features/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      assets: assetSlice,
      products: productSlice,
      users: userSlice,
    },
  });
};
