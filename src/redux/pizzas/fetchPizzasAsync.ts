import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { PizzaType } from "./types";

export const fetchPizzas = createAsyncThunk<
  PizzaType[],
  Record<string, string>
>("users/fetchPizzasStatus", async ({ params }) => {
  const { data } = await axios.get<PizzaType[]>(
    `https://662520ff04457d4aaf9df0a0.mockapi.io/items`,
    {
      params,
    }
  );
  return data;
});
