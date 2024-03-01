import { useEffect } from 'react';
import styles from "./productsList.module.css";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { CURRENT_PAGE_PRODUCTS, IS_FILTERED } from '../../store/actions';
import PaginationBox from '../paginationBox/paginationBox';
import Loader from '../loader/loader';
import FilterBlock from '../filterBlock/filterBlock';

function ProductsList() {

  const dispatch = useDispatch();
  const ids = useSelector((state) => state.products.productsListId);
  const currentPage = useSelector((state) => state.products.currentPage);
  const productsPerPage = useSelector((state) => state.products.productsPerPage);
  const currentPageProducts = useSelector((state) => state.products.currentPageProducts);
  const isFiltered = useSelector((state) => state.products.isFiltered);
  const filteredData = useSelector((state) => state.products.filteredData);
  const auth = useSelector((state) => state.products.auth);

  function deleteDuble (data) {
    let obj= {};
    let result = [];
    data.map((item) => {
      if (obj[item.id]) {
        obj[item.id] += 1
      } else {
        obj[item.id] = 1
        result.push(item)
      }
    })
    return result
  }

  function getCurrentPageIds (ids) {
    const skip = (currentPage - 1) * productsPerPage;
    if (!ids) {
      return [];
    }
    const result = ids.slice(skip, skip + productsPerPage);
    return result;
  }

  const idsCurrentPage = getCurrentPageIds(ids);
  useEffect(() => {
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
        currentPageProducts: deleteDuble(response.data.result),
      })
    })
    .catch((e) => {
      console.log(e.code)
    })
  }, [idsCurrentPage]);

  const data = isFiltered ? filteredData : currentPageProducts;

  return (
    <div className={styles.listWrap}>
      { data ?
      <div className={styles.list}>
        <FilterBlock />
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
              data.map((item) => <tr className={styles.string} key={item.id}>
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
