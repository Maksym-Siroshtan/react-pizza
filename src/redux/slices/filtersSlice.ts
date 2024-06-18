import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum SortProperty {
  RATING_DESC = "rating",
  PRICE_DESC = "price",
  TITLE_DESC = "title",
  RATING_ASC = "-rating",
  PRICE_ASC = "-price",
  TITLE_ASC = "-title",
}

export type SortType = {
  name: string;
  sortProperty: SortProperty;
};

interface FiltersSliceState {
  categoryId: number;
  currentPage: number;
  search: string;
  sortType: SortType;
}

const initialState: FiltersSliceState = {
  categoryId: 0,
  currentPage: 1,
  search: "",
  sortType: {
    name: "популярністю (DESC)",
    sortProperty: SortProperty.RATING_DESC,
  },
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
    setFilters: (state, action: PayloadAction<FiltersSliceState>) => {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sortType = action.payload.sortType;
    },
  },
});

export const {
  setCategoryId,
  setCurrentPage,
  setSearch,
  setSortType,
  setFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
