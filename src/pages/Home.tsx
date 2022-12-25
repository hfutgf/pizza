import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";
import { Link, useNavigate } from "react-router-dom";
import Categories from "../components/Categories/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort/Sort";
import Pagination from "../components/Pagination";
import NotFoundBlock from "../components/NotFoundBlock";
import {
  setCategoryId,
  setPageCount,
  setFilters,
} from "../redux/slices/filterSlice";
import { list } from "../components/Sort/Sort";
import { useRef } from "react";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { RootState } from "../redux/store";

const Home: React.FC = () => {
  const { categoryId, sort, searchValue, pageCount } = useSelector(
    (state: RootState) => state?.filter
  );
  const { pizzas, status } = useSelector((state: RootState) => state?.pizza);

  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getPizzas = async () => {
      const category = categoryId > 0 ? `&category=${categoryId}` : "";
      const search = searchValue ? `&search=${searchValue}` : "";
      const sortBy: string = sort?.sortProperty
        ? `&sortBy=${sort?.sortProperty}`
        : "";

      dispatch(
        //@ts-ignore
        fetchPizzas({
          category,
          search,
          sortBy,
          pageCount,
        })
      );
      window.scrollTo(0, 0);
    };

    getPizzas();

    isSearch.current = false;
  }, [sort?.sortProperty, searchValue, pageCount, categoryId, dispatch]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortList = list?.find(
        (elem) => elem?.sortProperty === params?.sortProperty
      );

      dispatch(
        setFilters({
          sort: sortList,
          searchValue: String(params?.searchValue) || "",
          categoryId: Number(params?.categoryId) || 0,
          pageCount: Number(params?.pageCount) || 0,
        })
      );
      isSearch.current = true;
    }
  }, [dispatch]);

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

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page: number) => {
    dispatch(setPageCount(page));
  };

  const items = pizzas
    ?.filter((obj: { title: string }) => {
      if (obj?.title?.toLowerCase().includes(searchValue?.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    })
    .map(
      (pizza: {
        id: string;
        title: string;
        imageUrl: string;
        price: number;
        sizes: number[];
        rating: number;
      }) => (
        //@ts-ignore
        <PizzaBlock {...pizza} key={pizza?.id} />
      )
    );
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
      {status === "error" ? (
        <NotFoundBlock />
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : items}
        </div>
      )}

      <Pagination onChangePage={onChangePage} />
    </>
  );
};

export default Home;
