import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductsList from './components/productsList/productsList';
import styles from './App.module.css';
import moment from 'moment';
import md5 from 'md5';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import axiosRetry from 'axios-retry';
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
        }

  useEffect(() => {
    axiosRetry(axios, { retries: 4 });
    axios.post('https://api.valantis.store:41000/', data, {
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
    })
    .catch((e) => {
      console.log(e.code)
    })
  }, [])

  return (
    <div className={styles.app}>
      <Routes>
        <Route  path={'/'}
                element={<ProductsList />} />
      </Routes>
    </div>
  );
}

export default App;
