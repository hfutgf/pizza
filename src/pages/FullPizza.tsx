import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const navigate = useNavigate();
  useEffect(() => {
    const getPizza = async () => {
      try {
        const { data } = await axios.get(
          "https://638109d3786e112fe1c11c3d.mockapi.io/pizzas/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("BACK_END ERROR EVERY BODY");
        navigate("/");
      }
    };
    getPizza();
  }, [id]);
  if (!pizza) {
    return <>LOADING....</>;
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="imag" width={350} />
      <h3>{pizza.title}</h3>
      <p>{pizza.price} ₽</p>
    </div>
  );
};

export default FullPizza;
