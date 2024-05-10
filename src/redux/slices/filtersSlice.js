import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    onChangeCategory: (state, action) => {
      state.categoryId = action.payload.id;
    },
  },
});

export const { onChangeCategory } = filtersSlice.actions;

export default filtersSlice.reducer;
