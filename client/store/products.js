import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_PRODUCTS = 'SET_PRODUCTS'

/**
 * ACTION CREATORS
 */
const setProducts = (products) => ({ type: SET_PRODUCTS, products })

/**
 * THUNK CREATORS
 */

export const fetchProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/products/')
    return dispatch(setProducts(data))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function productsReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return [...action.products]
    default:
      return state
  }
}
