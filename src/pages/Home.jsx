import { useState, useEffect } from "react";
import axios from "axios";

import Categories from "../components/Categories";
import Search from "../components/Search";
import Sort from "../components/Sort";

import PizzaBlockList from "../components/PizzaBlock/PizzaBlockList";

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярністю (DESC)",
    sortProperty: "rating",
  });
  const [search, setSearch] = useState("");

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const sortBy = sortType.sortProperty.replace("-", "");
      const order = sortType.sortProperty.includes("-") ? "ask" : "desc";
      const category = categoryId > 0 ? `${categoryId}` : "";

      const params = {
        sortBy,
        order,
      };

      if (category) {
        params.category = category;
      }

      if (search) {
        params.search = search;
      }

      const { data } = await axios.get(
        `https://662520ff04457d4aaf9df0a0.mockapi.io/items`,
        {
          params,
        }
      );

      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [categoryId, sortType, search]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => setCategoryId(id)}
        />
        <Sort value={sortType} onChangeSort={(obj) => setSortType(obj)} />
      </div>
      <div className="content__title-search-wrapper">
        <h2 className="content__title">
          {search ? `Пошук за запитом: ${search}` : "Всі піци"}
        </h2>
        <Search search={search} setSearch={setSearch} />
      </div>
      <p></p>
      <PizzaBlockList items={items} isLoading={isLoading} />
    </div>
  );
}

export default Home;
