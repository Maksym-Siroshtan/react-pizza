import React from "react";

function Categories() {
  const [activeCategoryIndex, setActiveCategoryIndex] = React.useState(0);

  const categories = [
    "Всі",
    "М'ясні",
    "Вегетаріанські",
    "Гриль",
    "Гострі",
    "Закриті",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, idx) => {
          return (
            <li
              key={idx}
              onClick={() => setActiveCategoryIndex(idx)}
              className={activeCategoryIndex === idx ? "active" : ""}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
