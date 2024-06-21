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
