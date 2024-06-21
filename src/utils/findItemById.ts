import { CartItemType } from "../redux/cart/types";

export const findItemById = (items: CartItemType[], id: string) =>
  items.find((item) => item.id === id);
