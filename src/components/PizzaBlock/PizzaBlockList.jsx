import PizzaSkeleton from "./PizzaSkeleton";
import PizzaBlock from "./PizzaBlock";

function PizzaBlockList({ items, isLoading }) {
  return (
    <ul className="content__items">
      {isLoading
        ? [...new Array(10)].map((_, idx) => <PizzaSkeleton key={idx} />)
        : items.map((item) => (
            <PizzaBlock isLoading={isLoading} key={item.id} {...item} />
          ))}
    </ul>
  );
}

export default PizzaBlockList;
