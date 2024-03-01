import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import styles from "./filterBlock.module.css";
import { FILTERED_ID, FILTERED_DATA, IS_FILTERED } from "../../store/actions";

function FilterBlock() {

  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState('');
  const [searchPrice, setSearchPrice] = useState('');
  const [searchBrand, setSearchBrand] = useState('');
  const auth = useSelector((state) => state.products.auth);
  const filteredId = useSelector((state) => state.products.filteredId);

  function getData (searchPrice, searchName, searchBrand) {
    let data;
    if (searchPrice !== '') {
      data = {
        "action": "filter",
        "params": {
          "price": Number(searchPrice),
          "product": searchName,
          "brand": searchBrand,
        }
      };
    } else {
      data = {
        "action": "filter",
        "params": {
          "product": searchName,
          "brand": searchBrand,
        }
      }
    };
    return data;
  }

  function load (data) {
    axios.post('http://api.valantis.store:40000/', data, {
        headers: {
          "X-Auth": `${auth}`,
        }
      })
      .then(response => {
        dispatch({
          type: FILTERED_ID,
          filteredId: response.data.result,
        })
      })
      .catch((e) => {
        console.log(e.code)
      })
  }

  function filteredData (e, searchPrice, searchName, searchBrand) {
    e.preventDefault();
    const data = getData(searchPrice, searchName, searchBrand);
    load(data)
    dispatch({
      type: IS_FILTERED,
      isFiltered: true,
    })
  }

  useEffect(() => {
    const data = {
      "action": "get_items",
      "params": { "ids": filteredId }
    }

    axios.post('http://api.valantis.store:40000/', data, {
        headers: {
          "X-Auth": `${auth}`,
        }
      })
      .then(response => {
        console.log(response)
        dispatch({
          type: FILTERED_DATA,
          filteredData: response.data.result,
        })
      })
      .catch((e) => {
        console.log(e.code)
      })
  }, [filteredId])

    return (
      <div className={styles.wrapper}>
        <p className={styles.head}>
          Фильтровать по:
        </p>
        <form className={styles.form}>
          <label htmlFor="name" className={styles.label}>
            <span className={styles.descr}>Названию</span>
            <input
              id="search-name"
              placeholder="Введите название"
              value={searchName}
              type="text"
              name="searchName"
              className={styles.input}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </label>
          <label htmlFor="price" className={styles.label}>
            <span className={styles.descr}>Цене</span>
            <input
              id="search-price"
              placeholder="Введите цену"
              value={searchPrice}
              type="text"
              name="searchPrice"
              className={styles.input}
              onChange={(e) => setSearchPrice(e.target.value)}
            />
          </label>
          <label htmlFor="brand" className={styles.label}>
            <span className={styles.descr}>Бренду</span>
            <input
              id="search-brand"
              placeholder="Введите бренд"
              value={searchBrand}
              type="text"
              name="searchBrand"
              className={styles.input}
              onChange={(e) => setSearchBrand(e.target.value)}
            />
          </label>
          <button className={styles.btn} type="submit" onClick={(e) => filteredData(e, searchPrice, searchName, searchBrand)}>Фильтровать</button>
        </form>
      </div>
    );
  }

  export default FilterBlock;
