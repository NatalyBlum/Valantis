import { useEffect, useCallback, useState } from 'react';
import styles from "./productsList.module.css";
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { useDispatch, useSelector } from 'react-redux';
import { CURRENT_PAGE_PRODUCTS } from '../../store/actions';
import PaginationBox from '../paginationBox/paginationBox';
import Loader from '../loader/loader';
import FilterBlock from '../filterBlock/filterBlock';
import Table from '../table/table';

function ProductsList() {

  const dispatch = useDispatch();
  const ids = useSelector((state) => state.products.productsListId);
  const currentPage = useSelector((state) => state.products.currentPage);
  const productsPerPage = useSelector((state) => state.products.productsPerPage);
  const currentPageProducts = useSelector((state) => state.products.currentPageProducts);
  const isFiltered = useSelector((state) => state.products.isFiltered);
  const auth = useSelector((state) => state.products.auth);
  const filteredId = useSelector((state) => state.products.filteredId);
  const [loading, setLoading] = useState(false);

  function deleteDuble (data) {
    let obj= {};
    let result = [];
    for (let item of data) {
      if (obj[item.id]) {
        obj[item.id] += 1
      } else {
        obj[item.id] = 1
        result.push(item)
      }
    }
    return result
  }

  const getCurrentPageIds = useCallback((ids) => {
    const skip = (currentPage - 1) * productsPerPage;
    if (!ids) {
      return [];
    }
    const result = ids.slice(skip, skip + productsPerPage);
    return result;
  }, [currentPage, productsPerPage])

  useEffect(() => {

    let data;
    if (isFiltered) {
      data = {
        "action": "get_items",
        "params": { "ids": getCurrentPageIds(filteredId) }
      }
    } else {
      data = {
        "action": "get_items",
        "params": { "ids": getCurrentPageIds(ids) }
      }
    }

    setLoading(true)
    axiosRetry(axios, { retries: 4 });
    axios.post('http://api.valantis.store:40000/', data, {
      headers: {
        "X-Auth": `${auth}`,
      }
    })
      .then(response => {
        setLoading(false);
        dispatch({
          type: CURRENT_PAGE_PRODUCTS,
          currentPageProducts: deleteDuble(response.data.result),
        })
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.code)
      })
  }, [currentPage, filteredId, ids]);

  return (
    <div className={styles.listWrap}>
      { !loading ?
        <div className={styles.list}>
          <FilterBlock />
          <Table currentPageProducts={currentPageProducts}/>
          <PaginationBox count={isFiltered ? filteredId.length : ids.length} />
        </div> : <Loader />
      }
    </div>
  );
}

export default ProductsList;
