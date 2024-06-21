import { createSlice } from "@reduxjs/toolkit";
import { fetchPizzas } from "./fetchPizzasAsync";
import { PizzasSliceState, Status } from "./types";

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
