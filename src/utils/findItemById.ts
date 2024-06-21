import { CartItemType } from "../redux/slices/cartSlice";

export const findItemById = (items: CartItemType[], id: string) =>
  items.find((item) => item.id === id);
