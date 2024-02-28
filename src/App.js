import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductsList from './components/productsList/productsList';
import Product from './components/product/product';
import styles from './App.module.css';
import moment from 'moment';
import md5 from 'md5';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { PRODUCTSLIST } from './store/actions';

function getAuth() {
  const date = new Date();
  const utcDate = moment(date).utc().format('YYYYMMDD');
  return md5(`Valantis_${utcDate}`);
}

function App() {
  const dispatch = useDispatch();
  const auth = getAuth();
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
        type: PRODUCTSLIST,
        productsList: response.data.result,
      })
      console.log(response.data.result.length)
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
