import { useEffect, useState } from 'react';
import styles from "./productsList.module.css";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { CURRENT_PAGE_PRODUCTS } from '../../store/actions';
import PaginationBox from '../paginationBox/paginationBox';
import Loader from '../loader/loader';

function ProductsList() {

  const dispatch = useDispatch();
  const ids = useSelector((state) => state.products.productsListId);
  const currentPage = useSelector((state) => state.products.currentPage);
  const productsPerPage = useSelector((state) => state.products.productsPerPage);
  const currentPageProducts = useSelector((state) => state.products.currentPageProducts);
  console.log(currentPageProducts)
  const auth = useSelector((state) => state.products.auth);

  function getCurrentPageIds (ids) {
    const skip = (currentPage - 1) * productsPerPage;
    if (!ids) {
      return [];
    }
    const result = ids.slice(skip, skip + productsPerPage - 1);
    return result;
  }

  useEffect(() => {
    const idsCurrentPage = getCurrentPageIds(ids);
    const data = {
      "action": "get_items",
      "params": { "ids": idsCurrentPage }
    }

    axios.post('http://api.valantis.store:40000/', data, {
      headers: {
        "X-Auth": `${auth}`,
      }
    })
    .then(response => {
      dispatch({
        type: CURRENT_PAGE_PRODUCTS,
        currentPageProducts: response.data.result,
      })
    })
    .catch((response) => {
      console.log(response.status)
    })
  }, [ids, currentPage])

  return (
    <div className={styles.listWrap}>
      { !(currentPageProducts.length === 0) ?
      <div className={styles.list}>
        <div>
          <table id="table" className={styles.matchTable}>
            <thead>
              <tr>
                <td className={styles.tableHead}> id </td>
                <td className={styles.tableHead}> Название </td>
                <td className={styles.tableHead}> Цена </td>
                <td className={styles.tableHead}> Бренд </td>
              </tr>
            </thead>
            <tbody>
            {
              currentPageProducts.map((item) => <tr className={styles.string} key={item.id}>
                <td className={`${styles.cell} + ${styles.columnName}`}>{ item.id }</td>
                <td className={`${styles.cell} + ${styles.columnName}`}>{item.product}</td>
                <td className={styles.cell}>{ item.price }</td>
                <td className={styles.cell}>
                  {
                    item.brand ? item.brand : '-'
                  }
                </td>
              </tr>
              )
            }
            </tbody>
          </table>
        </div>
        <PaginationBox />
      </div> : <Loader />
    }
    </div>
  );
}

export default ProductsList;
