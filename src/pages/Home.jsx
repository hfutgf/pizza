import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import qs from "qs";
import { Await, useNavigate } from "react-router-dom";
import Categories from "../components/Categories/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort/Sort";
import Pagination from "../components/Pagination";
import { StoreContext } from "../App";
import {
  setCategoryId,
  setPageCount,
  setFilters,
} from "../redux/slices/filterSlice";
import { list } from "../components/Sort/Sort";
import { useRef } from "react";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { categoryId, sort, pageCount } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { searchValue } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortList = list.find(
        (elem) => elem?.sortProperty === params?.sortProperty
      );
      dispatch(
        setFilters({
          ...params,
          sortList,
        })
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  const fetchPizzas = async () => {
    setIsLoading(true);

    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    const sortBy = sort?.sortProperty ? `&sortBy=${sort.sortProperty}` : "";

    const res = await axios.get(
      `https://638109d3786e112fe1c11c3d.mockapi.io/pizzas?page=${pageCount}&limit=4${category}${sortBy}${search}&order=desc`
    );
    setPizzas(res.data);
    setIsLoading(false);
    window.scrollTo(0, 0);
  };

  useEffect(
    () => {
      if (!isSearch.current) {
        fetchPizzas();
      }
      isSearch.current = false;
    },
    [sort?.sortProperty, searchValue, pageCount, categoryId],
    fetchPizzas
  );

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        pageCount,
        categoryId,
        sortProperty: sort?.sortProperty,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort?.sortProperty, pageCount, navigate]);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setPageCount(number));
  };
  const items = pizzas
    .filter((obj) => {
      if (obj?.title?.toLowerCase().includes(searchValue?.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    })
    .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : items}</div>
      <Pagination onChangePage={onChangePage} />
    </>
  );
};

export default Home;
