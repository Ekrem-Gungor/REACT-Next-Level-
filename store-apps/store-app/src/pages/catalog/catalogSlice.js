import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import request from "../../api/apiClient";

export const fetchProducts = createAsyncThunk(
  "catalog/fetchProducts",
  async () => {
    return await request.products.list();
  }
);

export const fetchProductById = createAsyncThunk(
  "catalog/fetchProductById",
  async (productId) => {
    return await request.products.details(productId);
  }
);

const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState({
  status: "idle",
  isloaded: false,
});

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //#region getAll
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "pendingFetchProducts";
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload),
        (state.isloaded = true),
        (state.status = "idle");
    });

    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = "idle";
    });
    //#endregion

    //#region getById
    builder.addCase(fetchProductById.pending, (state) => {
      state.status = "pendingFetchProductById";
    });

    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      productsAdapter.setOne(state, action.payload),
        (state) => (state.status = "idle");
    });

    builder.addCase(fetchProductById.rejected, (state) => {
      state.status = "idle";
    });
    //#endregion
  },
});

export const {
  selectById: selectProductById,
  selectAll: selectAllProducts,
  selectTotal: selectTotalProducts,
} = productsAdapter.getSelectors((state) => state.catalog);
