import { PRODUCTSLIST } from "./actions";

let initialState = {
  productsList: [],
}

export const productsReducer = (state = initialState, action) => {
  switch(action.type) {
    case PRODUCTSLIST:
      return {
        ...state,
        productsList: action.productsList,
      }
    default:
      return state
  }
}
