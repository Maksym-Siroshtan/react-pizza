import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { findItemById } from "../../utils/findItemById";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calculateCartValues } from "../../utils/calculateCartValues";

import { CartItemType, CartSliceState } from "./types";

const initialState: CartSliceState = getCartFromLS();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItemType>) => {
      const isAddedItem = findItemById(state.items, action.payload.id);

      if (isAddedItem) {
        isAddedItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      calculateCartValues(state);
    },
    minusItem(state, action: PayloadAction<string>) {
      const isAddedItem = findItemById(state.items, action.payload);

      if (isAddedItem) {
        isAddedItem.count--;
      }

      calculateCartValues(state);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);

      calculateCartValues(state);
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
