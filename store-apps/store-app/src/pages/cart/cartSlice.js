import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../api/apiClient";

const initialState = {
  cart: null,
  status: "idle",
};

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ productId, quantity = 1 }) => {
    try {
      return await request.cart.addItem(productId, quantity);
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteItemFromCart = createAsyncThunk(
  "cart/deleteItemFromCart",
  async ({ productId, quantity = 1, key = "" }) => {
    try {
      return await request.cart.deleteItem(productId, quantity);
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCart = createAsyncThunk("cart/getCart", async (_, thunkAPI) => {
  try {
    return await request.cart.get();
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    clearCart: (state) => {
      state.cart = null;
    },
  },
  extraReducers: (builder) => {
    //#region - AddAction
    builder.addCase(addItemToCart.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });

    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.status = "idle";
    });

    builder.addCase(addItemToCart.rejected, (state) => {
      state.status = "idle";
    });
    //#endregion

    //#region - DeleteAction
    builder.addCase(deleteItemFromCart.pending, (state, action) => {
      state.status =
        "pendingDeleteItem" + action.meta.arg.productId + action.meta.arg.key;
    });

    builder.addCase(deleteItemFromCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.status = "idle";
    });

    builder.addCase(deleteItemFromCart.rejected, (state) => {
      state.status = "idle";
    });
    //#endregion

    //#region - GetCart
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    //#endregion
  },
});

export const { setCart, clearCart } = cartSlice.actions;
