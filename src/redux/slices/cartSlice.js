import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

const findAddedItemById = (items, id) => items.find((item) => item.id === id);

const recalculateTotalPrice = (state) => {
  state.totalPrice = state.items.reduce(
    (sum, item) => item.price * item.count + sum,
    0
  );
};

const recalculateTotalCount = (state) => {
  state.totalCount = state.items.reduce(
    (length, item) => item.count + length,
    0
  );
};

const recalculateTotalValues = (state) => {
  recalculateTotalPrice(state);
  recalculateTotalCount(state);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const isAddedItem = findAddedItemById(state.items, action.payload.id);

      if (isAddedItem) {
        isAddedItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      recalculateTotalValues(state);
    },
    minusItem(state, action) {
      const isAddedItem = findAddedItemById(state.items, action.payload);

      if (isAddedItem) {
        isAddedItem.count--;
      }

      recalculateTotalValues(state);
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);

      recalculateTotalValues(state);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
