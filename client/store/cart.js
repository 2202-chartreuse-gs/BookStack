import axios from 'axios'
/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART'

const TOKEN = 'token'


/**
 * ACTION CREATORS
 */
export const setCart = (cart) => ({ type: SET_CART, cart })


/**
 * THUNK CREATORS
 */

export const fetchCart = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${userId}/cart`)
    let userCart = {
      userId: data.user.id,
      items: {},
      totalItems: 0,
    }
    data.cart[0].products.forEach((product) => {
      let cartQty = product.Order_Products.qty
      if (!userCart.items[product.id]) {
        //if the product doesn't exist in the cart add a placeholder
        userCart.items[product.id] = product.id
        userCart.items[product.id] = { ...product }
        userCart.items[product.id].qty = 0
      }
      //update the quantity
      userCart.items[product.id].qty += cartQty
      //update the total items count
      userCart.totalItems += cartQty
    })
    dispatch(setCart(userCart))
    return userCart
  } catch (error) {
    console.log(error)
  }
}

//saves cart to DB // NOTE totalQty must be the new total count of that item, NOT an incrementer
export const updateDBCart =
  (userId, productId, totalQty, price) => async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN)
    try {
      const putRoute = '/api/order/' + userId + '/cart'
      const res = await axios.put(
        putRoute,
        { userId, productId, totalQty, price },
        {
          headers: {
            authorization: token,
          },
        }
      )
    } catch (error) {
      console.log(error)
    }
  }


/**
 * REDUCER
 */

export default function cartReducer(
  state = { userId: 0, items: {}, totalItems: 0, userId: 0 },
  action
) {
  switch (action.type) {
    case SET_CART:
      return { ...action.cart }
    default:
      return state
  }
}
