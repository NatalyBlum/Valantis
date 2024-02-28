import { PRODUCTS_LIST_ID, AUTH, COUNT, CURRENT_PAGE_PRODUCTS, CURRENT_PAGE, PRODUCTS_PER_PAGE } from "./actions";

let initialState = {
  productsListId: [],
  auth: '',
  count: 0,
  currentPageProducts: [],
  currentPage: 1,
  productsPerPage: 50,
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
    // case PRODUCTS_PER_PAGE:
    //   return {
    //     ...state,
    //     productsPerPage: action.productsPerPage,
    //   }
    default:
      return state
  }
}
