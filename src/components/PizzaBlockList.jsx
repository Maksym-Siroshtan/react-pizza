import PizzaBlock from "./PizzaBlock";

function PizzaBlockList({ items }) {
  return (
    <ul className="content__items">
      {items.map((item) => (
        <PizzaBlock key={item.id} {...item} />
      ))}
    </ul>
  );
}

export default PizzaBlockList;
