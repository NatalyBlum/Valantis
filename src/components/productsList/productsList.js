import { useEffect } from 'react';
import styles from "./productsList.module.css";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { CURRENT_PAGE_PRODUCTS } from '../../store/actions';

function ProductsList() {

  const dispatch = useDispatch();
  const ids = useSelector((state) => state.products.productsListId);
  const currentPage = useSelector((state) => state.products.currentPage);
  const productsPerPage = useSelector((state) => state.products.productsPerPage);
  const currentPageProducts = useSelector((state) => state.products.currentPageProducts);
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
      console.log(response.data.result)
    })
  }, [ids])

  return (
  <div>
    {
      currentPageProducts ?
      <table id="table" className={styles.matchTable}>
        <thead>
          <tr>
            <td> id </td>
            <td> Название </td>
            <td> Цена </td>
            <td> Бренд </td>
          </tr>
        </thead>
        <tbody>
        {
          currentPageProducts.map((item) => <tr className={styles.string} key={item.id}>
            <td className={styles.cell}>{ item.id }</td>
            <td className={styles.cell}>{item.product}</td>
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
      </table> : <></>
      }
    </div>
  );
}

export default ProductsList;
