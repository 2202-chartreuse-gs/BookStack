import axios from 'axios'
/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART'
const GET_CART = 'GET_CART'

/**
 * ACTION CREATORS
 */
export const setCart = (cart) => ({ type: SET_CART, cart })
export const _getCart = (cart) => ({ type: GET_CART, cart })

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

export const getCart = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${id}/cart`)
    return dispatch(_getCart(data))
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
    case GET_CART:
      return { ...action.cart }
    default:
      return state
  }
}
