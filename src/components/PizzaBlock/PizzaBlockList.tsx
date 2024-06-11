import React from "react";

import PizzaSkeleton from "./PizzaSkeleton";
import PizzaBlock from "./PizzaBlock";

type PizzaListProps = { items: any; status: any };

const PizzaBlockList: React.FC<PizzaListProps> = ({ items, status }) => {
  return (
    <ul className="content__items">
      {status === "loading"
        ? [...new Array(10)].map((_, idx) => <PizzaSkeleton key={idx} />)
        : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
    </ul>
  );
};

export default PizzaBlockList;
