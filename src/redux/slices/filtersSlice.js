import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sortType: {
    name: "популярністю (DESC)",
    sortProperty: "rating",
  },
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    onChangeCategory: (state, action) => {
      state.categoryId = action.payload.id;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const { onChangeCategory, setSortType } = filtersSlice.actions;

export default filtersSlice.reducer;
