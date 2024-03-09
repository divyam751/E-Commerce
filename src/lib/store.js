import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productSlice,
    },
  });
};
