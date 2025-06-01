import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { router } from "../../App";
import request from "../../api/apiClient";

const initialState = {
  user: null,
  status: "idle",
};

export const loginUser = createAsyncThunk(
  "account/login",
  async (data, thunkAPI) => {
    try {
      const user = await request.account.login(data);
      localStorage.setItem("user", JSON.stringify(user));
      router.navigate("/");
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const registerUser = createAsyncThunk(
  "account/register",
  async (data, thunkAPI) => {
    try {
      await request.account.register(data);
      router.navigate("/login");
    } catch (error) {
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const getUser = createAsyncThunk(
  "account/getUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
    try {
      const user = await request.account.getUsers();
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      router.navigate("/login");
    },
  },
  extraReducers: (builder) => {
    //#region login
    builder.addCase(loginUser.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      (state.user = action.payload), (state.status = "idle");
    });

    builder.addCase(loginUser.rejected, (state) => {
      state.status = "idle";
    });
    //#endregion

    //#region register
    builder.addCase(registerUser.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(registerUser.fulfilled, (state) => {
      state.status = "idle";
    });

    builder.addCase(registerUser.rejected, (state) => {
      state.status = "idle";
    });
    //#endregion

    //#region getUser
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(getUser.rejected, (state) => {
      (state.user = null),
        localStorage.removeItem("user"),
        router.navigate("/login");
    });
    //#endregion
  },
});

export const { setUser, logout } = accountSlice.actions;
