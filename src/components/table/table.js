import styles from "./table.module.css";
import PropTypes from "prop-types";

function Table(props) {

    return (
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
              props.currentPageProducts.map((item) => <tr className={styles.string} key={item.id}>
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
    );
  }

  Table.propTypes = {
    count: PropTypes.number,
  };

  export default Table;
