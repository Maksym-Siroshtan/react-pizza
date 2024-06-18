import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

type PizzaType = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  type: string;
  size: number;
};

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface PizzasSliceState {
  items: PizzaType[];
  status: "loading" | "success" | "error";
}

export const fetchPizzas = createAsyncThunk<
  PizzaType[],
  Record<string, string>
>("users/fetchPizzasStatus", async ({ params }) => {
  const { data } = await axios.get<PizzaType[]>(
    `https://662520ff04457d4aaf9df0a0.mockapi.io/items`,
    {
      params,
    }
  );
  return data;
});

const initialState: PizzasSliceState = {
  items: [],
  status: "loading",
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
      });
  },
});

export default pizzasSlice.reducer;
