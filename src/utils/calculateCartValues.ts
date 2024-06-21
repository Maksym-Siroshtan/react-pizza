import { CartItemType, CartSliceState } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: CartItemType[]) => {
  return items.reduce((sum, item) => item.price * item.count + sum, 0);
};

export const calcTotalCount = (items: CartItemType[]) => {
  return items.reduce((length, item) => item.count + length, 0);
};

export const calculateCartValues = (state: CartSliceState) => {
  state.totalPrice = calcTotalPrice(state.items);
  state.totalCount = calcTotalCount(state.items);
};
