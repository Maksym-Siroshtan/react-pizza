import React from "react";
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import qs from "qs";

import {
  setCategoryId,
  setCurrentPage,
  setSearch,
  setSortType,
  setFilters,
} from "../redux/slices/filtersSlice";
import { fetchPizzas } from "../redux/slices/pizzasSlice";

import { listOfSortObj } from "../components/Sort";
import Categories from "../components/Categories";
import Search from "../components/Search";
import Sort from "../components/Sort";

import PizzaBlockList from "../components/PizzaBlock/PizzaBlockList";
import Pagination from "../components/Pagination/Pagination";

import { SortObjItem } from "../@types/SortObjType";

type PizzaParams = {
  page: number;
  limit: number;
  sortBy: string;
  order: string;
  category?: string;
  search?: string;
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector((state) => state.pizzas);
  const { categoryId, currentPage, search, sortType } = useSelector(
    (state) => state.filters
  );

  const onChangeCategoryId = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onPageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const onChangeSearchQuery = (searchQuery: string) => {
    dispatch(setSearch(searchQuery));
  };

  const onChangeSort = (sortObj: SortObjItem) => {
    dispatch(setSortType(sortObj));
  };

  const getPizzas = () => {
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "ask" : "desc";
    const category = categoryId > 0 ? `${categoryId}` : "";

    const params: PizzaParams = {
      page: currentPage,
      limit: 4,
      sortBy,
      order,
    };

    if (category) {
      params.category = category;
    }

    if (search) {
      params.search = search;
    }

    dispatch(
      fetchPizzas({
        params,
      })
    );
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        currentPage,
        sortType: sortType.sortProperty,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const searchParams = window.location.search.substring(1);
      const parsedSearchParams = qs.parse(searchParams);

      const sortTypeObj = listOfSortObj.find(
        (sortObj) => sortObj.sortProperty === parsedSearchParams.sortType
      );

      dispatch(
        setFilters({
          ...parsedSearchParams,
          sortType: sortTypeObj,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, search, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategoryId={onChangeCategoryId}
        />
        <Sort value={sortType} onChangeSort={onChangeSort} />
      </div>
      <div className="content__title-search-wrapper">
        <h2 className="content__title">
          {search ? `Пошук за запитом: ${search}` : "Всі піци"}
        </h2>
        <Search onChangeSearchQuery={onChangeSearchQuery} />
      </div>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>
            Ойй. Біда... <span>😕</span>
          </h2>
          <p>Нажаль сталася помилка. Спробуйте повторити спробу пізніше.</p>
        </div>
      ) : (
        <PizzaBlockList items={items} status={status} />
      )}

      <Pagination currentPage={currentPage} onPageChange={onPageChange} />
    </div>
  );
};

export default Home;
