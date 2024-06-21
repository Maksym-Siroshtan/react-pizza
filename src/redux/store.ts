import { configureStore } from "@reduxjs/toolkit";

import filtersReducer from "../redux/filters/slice";
import cartReducer from "../redux/cart/slice";
import pizzasReducer from "../redux/pizzas/slice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    cart: cartReducer,
    pizzas: pizzasReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
