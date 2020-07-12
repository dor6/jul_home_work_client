import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Actions from '../../actions'
import SearchBar from './searchBar';
import Product from './product';
import { useDebounceCallback } from '@react-hook/debounce'

const TabOne = () => {
  const [search, setSearch] = useState('');
  const prevSearch = useRef();

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.tabOneReducer.isLoading);
  const products = useSelector(state => state.tabOneReducer.products);

  const requestProducts = useDebounceCallback(
    useCallback((query) => dispatch(Actions.requestTabOneData(query)), [dispatch]),
    500,
    false
  );

  useEffect(() => {
    const query = search.trim();
    const prevQuery = prevSearch.current !== undefined ? prevSearch.current.trim() : undefined;

    prevSearch.current = search;

    if (query.length < 3) {
      // if there wasnt a previous query or the prevoiuse query caueses a search and this one doesn't
      if (prevQuery === undefined || prevQuery.length >= 3) {
        requestProducts();
      }
    }
    else {
      requestProducts(query);
    }

  }, [dispatch, search, prevSearch, requestProducts]);

  const handleSearchChange = useCallback(({ target: { value } }) => {
    setSearch(value);
  }, [setSearch]);

  return <div>
    <SearchBar search={search} onSearchChange={handleSearchChange} loading={isLoading} />
    {
      products.map((product, index) => (
        <Product product={product} key={product.id} index={index} />
      ))
    }
  </div>;
}

export default TabOne
