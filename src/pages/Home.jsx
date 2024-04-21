import { useState, useEffect } from "react";
import axios from "axios";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlockList from "../components/PizzaBlock/PizzaBlockList";

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("rating");

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

      const { data } = await axios.get(
        `https://662520ff04457d4aaf9df0a0.mockapi.io/items`,
        {
          params,
        }
      );

      setItems(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [sortBy]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort onChangeToSort={onChangeToSort} />
      </div>
      <h2 className="content__title">Всі піци</h2>
      <PizzaBlockList items={items} isLoading={isLoading} />
    </div>
  );
}

export default Home;
