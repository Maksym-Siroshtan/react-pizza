import { Link } from "react-router-dom";

import cartEmpty from "../assets/img/empty-cart.png";

function Cart() {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>
          Кошик порожній <span>😕</span>
        </h2>
        <p>
          Найімовірніше, Ви ще не замовляли піцу.
          <br />
          Для замовлення перейдіть на головну сторінку.
        </p>
        <img src={cartEmpty} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Повернутися назад</span>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
