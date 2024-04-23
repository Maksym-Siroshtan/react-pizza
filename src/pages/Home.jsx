import { useState, useEffect } from "react";
import axios from "axios";

import Categories from "../components/Categories";
import Search from "../components/Search";
import Sort from "../components/Sort";

import PizzaBlockList from "../components/PizzaBlock/PizzaBlockList";

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("rating");
  const [search, setSearch] = useState("");

  const onChangeToSort = (value) => {
    switch (value) {
      case 1:
        setSortBy("price");
        break;
      case 2:
        setSortBy("title");
        break;
      default:
        setSortBy("rating");
    }
  };

  const fetchItems = async () => {
    try {
      const params = {
        sortBy,
      };

      if (sortBy === "rating") {
        params.order = "desc";
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
  }, []);

  useEffect(() => {
    fetchItems();
  }, [sortBy, search]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort onChangeToSort={onChangeToSort} />
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
