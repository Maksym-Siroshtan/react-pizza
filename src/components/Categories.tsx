import React from "react";

type CategotiesProps = {
  categoryId: number;
  onChangeCategoryId: (id: number) => void;
};

const categories: string[] = [
  "Всі",
  "М'ясні",
  "Вегетаріанські",
  "Гриль",
  "Гострі",
  "Закриті",
];

export const Categories: React.FC<CategotiesProps> = React.memo(
  ({ categoryId, onChangeCategoryId }) => {
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
  }
);
