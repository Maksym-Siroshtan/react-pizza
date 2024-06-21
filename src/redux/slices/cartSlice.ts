import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { findItemById } from "../../utils/findItemById";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calculateCartValues } from "../../utils/calculateCartValues";

export type CartItemType = {
  id: string;
  imageUrl: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
};

export interface CartSliceState {
  items: CartItemType[];
  totalPrice: number;
  totalCount: number;
}

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

export const cartSelector = (state: RootState) => state.cart;

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
