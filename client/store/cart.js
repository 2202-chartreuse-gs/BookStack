import axios from 'axios'
/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART'

/**
 * ACTION CREATORS
 */
export const setCart = (cart) => ({ type: SET_CART, cart })

/**
 * THUNK CREATORS
 */

export const fetchCart = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/cart/')
    return dispatch(setCart(data))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function cartReducer(state = { totalItems: 0 }, action) {
  switch (action.type) {
    case SET_CART:
      return { ...action.cart }
    default:
      return state
  }
}
