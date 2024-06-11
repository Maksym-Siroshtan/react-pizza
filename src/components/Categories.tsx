import React from "react";

type CategotiesProps = {
  categoryId: number;
  onChangeCategoryId: any;
};

const categories: string[] = [
  "Всі",
  "М'ясні",
  "Вегетаріанські",
  "Гриль",
  "Гострі",
  "Закриті",
];

const Categories: React.FC<CategotiesProps> = ({
  categoryId,
  onChangeCategoryId,
}) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((category, idx) => {
          return (
            <li
              key={idx}
              onClick={() => onChangeCategoryId(idx)}
              className={categoryId === idx ? "active" : ""}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
