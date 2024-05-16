import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import qs from "qs";

import {
  setCategoryId,
  setCurrentPage,
  setSearch,
  setSortType,
  setFilters,
} from "../redux/slices/filtersSlice";
import { listOfSortObj } from "../components/Sort";

import Categories from "../components/Categories";
import Search from "../components/Search";
import Sort from "../components/Sort";

import PizzaBlockList from "../components/PizzaBlock/PizzaBlockList";

import Pagination from "../components/Pagination/Pagination";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, currentPage, search, sortType } = useSelector(
    (state) => state.filters
  );

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategoryId = (id) => {
    dispatch(setCategoryId(id));
  };

  const onPageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const onChangeSearchQuery = (searchQuery) => {
    dispatch(setSearch(searchQuery));
  };

  const onChangeSort = (sortObj) => {
    dispatch(setSortType(sortObj));
  };

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const sortBy = sortType.sortProperty.replace("-", "");
      const order = sortType.sortProperty.includes("-") ? "ask" : "desc";
      const category = categoryId > 0 ? `${categoryId}` : "";

      const params = {
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
      fetchItems();
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
        <Search search={search} onChangeSearchQuery={onChangeSearchQuery} />
      </div>
      <PizzaBlockList items={items} isLoading={isLoading} />

      <Pagination currentPage={currentPage} onPageChange={onPageChange} />
    </div>
  );
}

export default Home;
