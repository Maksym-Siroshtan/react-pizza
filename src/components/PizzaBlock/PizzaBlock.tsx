import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { addItem } from "../../redux/cart/slice";
import { cartSelector } from "../../redux/cart/selectors";

type PizzaBlockProps = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  rating: number;
};

const pizzaTypes = ["тонке", "традиційне"];

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  imageUrl,
  title,
  types,
  sizes,
  price,
  rating,
}) => {
  const dispatch = useDispatch();
  const { items } = useSelector(cartSelector);

  const [activePizzaTypeIndex, setActivePizzaTypeIndex] = React.useState(0);
  const [activePizzaSizeIndex, setActivePizzaSizeIndex] = React.useState(0);

  const addedItem = items.find((item) => item.id === id);
  const totalItem = !addedItem ? 0 : addedItem.count;

  const onClickAdd = () => {
    dispatch(
      addItem({
        id,
        imageUrl,
        title,
        price,
        type: pizzaTypes[activePizzaTypeIndex],
        size: sizes[activePizzaSizeIndex],
        count: 0,
      })
    );
  };

  return (
    <li className="pizza-block">
      <Link to={`pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </Link>

      <span>{[...new Array(rating)].map((_) => "⭐")}</span>
      <div className="pizza-block__description">
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type) => (
              <li
                key={type}
                onClick={() => setActivePizzaTypeIndex(type)}
                className={activePizzaTypeIndex === type ? "active" : ""}
              >
                {pizzaTypes[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, idx) => (
              <li
                key={idx}
                onClick={() => setActivePizzaSizeIndex(idx)}
                className={activePizzaSizeIndex === idx ? "active" : ""}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">від {price} грн.</div>
          <div
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Додати</span>
            {totalItem > 0 && <i>{totalItem}</i>}
          </div>
        </div>
      </div>
    </li>
  );
};
