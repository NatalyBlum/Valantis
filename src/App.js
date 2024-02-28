import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductsList from './components/productsList/productsList';
import Product from './components/product/product';
import styles from './App.module.css';
import moment from 'moment';
import md5 from 'md5';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { PRODUCTS_LIST_ID, AUTH, COUNT } from './store/actions';

function getAuth() {
  const date = new Date();
  const utcDate = moment(date).utc().format('YYYYMMDD');
  return md5(`Valantis_${utcDate}`);
}

function deleteDubleId (data) {
  const newSet = new Set (data);
  const newData = Array.from(newSet);
  return newData;
}

function App() {
  const dispatch = useDispatch();
  const auth = getAuth();
  dispatch({
    type: AUTH,
    auth: auth,
  })
  const data = {
          "action": "get_ids",
          // "params": {"offset": 0, "limit": 50}
        }

  useEffect(() => {
    axios.post('http://api.valantis.store:40000/', data, {
      headers: {
        "X-Auth": `${auth}`,
      }
    })
    .then(response => {
      dispatch({
        type: PRODUCTS_LIST_ID,
        productsListId: deleteDubleId(response.data.result),
      })
      dispatch({
        type: COUNT,
        count: deleteDubleId(response.data.result).length,
      })
      // console.log(typeof(deleteDubleId(response.data.result)))
    })
  }, [])

  return (
    <div className={styles.app}>
      <Routes>
        <Route  path={`/`}
                element={<ProductsList />} />
        <Route  path={'/:id'}
                element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
