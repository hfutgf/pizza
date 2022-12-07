import React from "react";
import { Link } from "react-router-dom";
import cartImg from "../../assets/img/empty-cart.png";

const array = [1, 2, 3, 4, 5];


const CartEmpty = () => {
  return (
   
      <div  className="cart cart--empty">
        <h2>
          Корзина пустая <icon>😕</icon>
        </h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={cartImg} alt="Empty cart" />
        <Link to="/"  className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
   
  );
};

export default CartEmpty;
