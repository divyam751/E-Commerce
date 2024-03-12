import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const REQUEST_URL = process.env.NEXT_PUBLIC_REQUEST_URL;

export const getCart = createAsyncThunk("product/getCart", async () => {
  const { userId, token } = sessionStorage.getItem("userData");
  const response = await fetch(`${REQUEST_URL}/cart/${userId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const productData = await response.json();
  // console.log("getProducts called");
  return productData.data;
});

const cartSlice = createSlice({
  name: "products",
  initialState: {
    cart: [],
    wishlist: [],
    cartLoading: false,
  },
  reducers: {
    addToCart: (state, { payload }) => {
      const existingItem = state.cart.find((item) => item.id === payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        payload = { ...payload, quantity: 1 };
        state.cart = [...state.cart, { ...payload }];
      }
    },
    updateCartQty: (state, { payload }) => {
      console.log(payload);

      const existingItem = state.cart.find(
        (item) => item.id === payload.payload.id
      );
      if (payload.action === "ADD") {
        existingItem.quantity += 1;
      } else {
        existingItem.quantity -= 1;
      }
    },
    addToWishlist: (state, { payload }) => {
      const existingIndex = state.wishlist.findIndex(
        (item) => item.id === payload.id
      );

      if (existingIndex === -1) {
        state.wishlist = [...state.wishlist, { ...payload }];
      } else {
        state.wishlist.splice(existingIndex, 1);
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(getCart.fulfilled, (state, { payload }) => {
      state.cartLoading = false;
      state.cart = payload;
    });
    builder.addCase(getCart.rejected, (state, error) => {
      state.cartLoading = true;
      console.log(error);
    });
  },
});

export const { addToCart, addToWishlist, updateCartQty } = cartSlice.actions;
export default cartSlice.reducer;
