import PizzaSkeleton from "./PizzaSkeleton";
import PizzaBlock from "./PizzaBlock";

function PizzaBlockList({ items, status }) {
  return (
    <ul className="content__items">
      {status === "loading"
        ? [...new Array(10)].map((_, idx) => <PizzaSkeleton key={idx} />)
        : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
    </ul>
  );
}

export default PizzaBlockList;
