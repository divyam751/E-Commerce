import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const REQUEST_URL = process.env.NEXT_PUBLIC_REQUEST_URL;

export const getCart = createAsyncThunk("product/getCart", async (userData) => {
  const { userId, token } = userData;
  const response = await fetch(`${REQUEST_URL}/cart/${userId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const productData = await response.json();
  return productData.items;
});

const calculateCartPrice = (cartData) => {
  let totalMrp = 0;
  let totalDiscount = 0;
  let totalAmount = 0;
  let couponDiscount = 0;
  let platformFee = 20;
  let shipingFee = 0;

  cartData?.forEach((product) => {
    totalMrp += product.mrp * product.quantity;
    totalAmount += product.price * product.quantity;
  });

  totalDiscount = totalMrp - totalAmount;

  return {
    totalMrp,
    totalDiscount,
    couponDiscount,
    platformFee,
    shipingFee,
    totalAmount,
  };
};

const cartSlice = createSlice({
  name: "products",
  initialState: {
    cartData: [],
    cartPrice: {
      totalMrp: 0,
      totalDiscount: 0,
      couponDiscount: 0,
      platformFee: 20,
      shipingFee: 0,
      totalAmount: 0,
    },
    wishlist: [],
    cartLoading: false,
  },
  reducers: {
    updateCart: (state, { payload }) => {
      state.cartData = payload;
      state.cartPrice = calculateCartPrice(payload);
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
    loadLogout: (state) => {
      state.cartData = [];
      state.cartPrice = {
        totalMrp: 0,
        totalDiscount: 0,
        couponDiscount: 0,
        platformFee: 20,
        shipingFee: 0,
        totalAmount: 0,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(getCart.fulfilled, (state, { payload }) => {
      state.cartLoading = false;
      state.cartData = payload;
      state.cartPrice = calculateCartPrice(payload);
    });
    builder.addCase(getCart.rejected, (state, error) => {
      state.cartLoading = true;
      console.log(error);
    });
  },
});

export const { addToWishlist, loadLogout, updateCart } = cartSlice.actions;
export default cartSlice.reducer;
