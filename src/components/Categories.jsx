import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { onChangeCategory } from "../redux/slices/filtersSlice";

function Categories() {
  const categoryId = useSelector((state) => state.filters.categoryId);
  const dispatch = useDispatch();

  const categories = [
    { title: "Всі", id: 0 },
    { title: "М'ясні", id: 1 },
    { title: "Вегетаріанські", id: 2 },
    { title: "Гриль", id: 3 },
    { title: "Гострі", id: 4 },
    { title: "Закриті", id: 5 },
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category) => {
          return (
            <li
              key={category.id}
              onClick={() => dispatch(onChangeCategory(category))}
              className={categoryId === category.id ? "active" : ""}
            >
              {category.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
