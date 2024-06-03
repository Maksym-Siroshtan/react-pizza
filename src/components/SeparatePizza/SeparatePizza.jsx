import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

import styles from "./SeparatePizza.module.scss";

function SeparatePizza() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pizza, setPizza] = React.useState();

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://662520ff04457d4aaf9df0a0.mockapi.io/items/${id}`
        );

        setPizza(data);
      } catch (error) {
        alert("Вибачте! Виникла помилка.");
        navigate("/");
      }
    })();
  }, []);

  if (!pizza) {
    return <h2 className="container">"Завантаження..."</h2>;
  }

  return (
    <div className="container">
      <div className={styles.separatePizza}>
        <img src={pizza.imageUrl} alt="Pizza" />
        <h2>{pizza.title}</h2>
        <p>
          Традиційна італійська страва, спочатку у вигляді круглої дріжджової
          коржі, що випікається з укладеною зверху начинкою з томатного соусу,
          сиру та найчастіше інших інгредієнтів, таких як м'ясо, овочі, гриби та
          інші продукти. Невелику піцу іноді називають піцеттою.
        </p>
        <span className={styles.price}>
          <b>{pizza.price}</b> ₴
        </span>
        <Link to="/" className="button button--black">
          <span>Повернутися назад</span>
        </Link>
      </div>
    </div>
  );
}

export default SeparatePizza;
