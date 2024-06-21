export type PizzaType = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  type: string;
  size: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface PizzasSliceState {
  items: PizzaType[];
  status: "loading" | "success" | "error";
}
