import { PRODUCTS_LIST_ID, AUTH, COUNT, CURRENT_PAGE_PRODUCTS, CURRENT_PAGE, FILTERED_ID, FILTERED_DATA, IS_FILTERED } from "./actions";

let initialState = {
  productsListId: [],
  auth: '',
  count: 0,
  currentPageProducts: [],
  currentPage: 1,
  productsPerPage: 50,
  filteredId: [],
  filteredData: [],
  isFiltered: false,
}

export const productsReducer = (state = initialState, action) => {
  switch(action.type) {
    case PRODUCTS_LIST_ID:
      return {
        ...state,
        productsListId: action.productsListId,
      }
    case AUTH:
      return {
        ...state,
        auth: action.auth,
      }
    case COUNT:
      return {
        ...state,
        count: action.count,
      }
    case CURRENT_PAGE_PRODUCTS:
      return {
        ...state,
        currentPageProducts: action.currentPageProducts,
      }
    case CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      }
    case FILTERED_ID:
      return {
        ...state,
        filteredId: action.filteredId,
      }
    case FILTERED_DATA:
      return {
        ...state,
        filteredData: action.filteredData,
      }
    case IS_FILTERED:
      return {
        ...state,
        isFiltered: action.isFiltered,
      }
    default:
      return state
  }
}
