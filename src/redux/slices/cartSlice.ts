import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItemType = {
  id: string;
  imageUrl: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
};

interface CartSliceState {
  items: CartItemType[];
  totalPrice: number;
  totalCount: number;
}

const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

const findAddedItemById = (items: CartItemType[], id: string) =>
  items.find((item) => item.id === id);

const recalculateTotalPrice = (state: CartSliceState) => {
  state.totalPrice = state.items.reduce(
    (sum, item) => item.price * item.count + sum,
    0
  );
};

const recalculateTotalCount = (state: CartSliceState) => {
  state.totalCount = state.items.reduce(
    (length, item) => item.count + length,
    0
  );
};

const recalculateTotalValues = (state: CartSliceState) => {
  recalculateTotalPrice(state);
  recalculateTotalCount(state);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItemType>) => {
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
    minusItem(state, action: PayloadAction<string>) {
      const isAddedItem = findAddedItemById(state.items, action.payload);

      if (isAddedItem) {
        isAddedItem.count--;
      }

      recalculateTotalValues(state);
    },
    removeItem(state, action: PayloadAction<string>) {
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

export const cartSelector = (state: RootState) => state.cart;

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
