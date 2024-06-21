import { calcTotalCount, calcTotalPrice } from "./calculateCartValues";
import { CartItemType, CartSliceState } from "../redux/cart/types";

export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  const items: CartItemType[] = data ? JSON.parse(data) : [];

  return {
    items,
    totalPrice: calcTotalPrice(items),
    totalCount: calcTotalCount(items),
  } as CartSliceState;
};
