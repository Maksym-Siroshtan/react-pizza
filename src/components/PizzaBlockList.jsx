import PizzaBlock from "./PizzaBlock";

function PizzaBlockList({ pizzas }) {
  return (
    <ul className="content__items">
      {pizzas.map((item) => (
        <PizzaBlock key={item.id} {...item} />
      ))}
    </ul>
  );
}

export default PizzaBlockList;
