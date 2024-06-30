import React from "react";

import { PizzaSkeleton } from "./PizzaSkeleton";
import { PizzaBlock } from "./PizzaBlock";
import { PizzasSliceState } from "../../redux/pizzas/types";

export const PizzaBlockList: React.FC<PizzasSliceState> = ({
  items,
  status,
}) => {
  return (
    <ul className="content__items">
      {status === "loading"
        ? [...new Array(10)].map((_, idx) => <PizzaSkeleton key={idx} />)
        : items.map((item: any) => <PizzaBlock key={item.id} {...item} />)}
    </ul>
  );
};
