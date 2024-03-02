import { useState, useEffect } from "react";
import styles from "./paginationBox.module.css";
import { Container, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_PAGE } from "../../store/actions";
import PropTypes from "prop-types";

function PaginationBox(props) {

  const { count } = props;
  const productsPerPage = useSelector((state) => state.products.productsPerPage);
  const countPage = Math.ceil(count / productsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  // console.log('box:', count)

  useEffect(() => {
    // console.log(currentPage)
    dispatch({
      type: CURRENT_PAGE,
      currentPage: currentPage,
    })
  }, [currentPage, dispatch])

    return (
      <div className={styles.paginationWrap}>
        <Container>
        { countPage > 1 && (
          <Pagination
            count={countPage}
            page={currentPage}
            onChange={(_, num) => setCurrentPage(num)}
            className={styles.pagination}
          />
        )}
        </Container>
      </div>
    );
  }

  PaginationBox.propTypes = {
    count: PropTypes.number,
  };

  export default PaginationBox;
