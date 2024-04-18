import { useState, useEffect } from "react";
import axios from "axios";

import "./scss/app.scss";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlockList from "./components/PizzaBlockList";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://0dbb8dbaba68354c.mokky.dev/items"
        );

        setItems(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Всі піци</h2>
          <PizzaBlockList items={items} />
        </div>
      </div>
    </div>
  );
}

export default App;
