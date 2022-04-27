import axios from 'axios'
import history from '../history'
const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_PRODUCTS = 'SET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'




/**
 * ACTION CREATORS
 */
const setProducts = (products) => ({ type: SET_PRODUCTS, products })

const _addProducts = (product) => ({ type: ADD_PRODUCT, product })

const _editProducts = (product) => ({ type: EDIT_PRODUCT, product })

const _deleteProducts = (product) => ({ type: DELETE_PRODUCT, product })



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

export const addProducts = (product, history) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN)
    const { data } = await axios.post('/api/products/', product, {
      headers: {
        authorization: token,
      }
    })
    history.push('/products')
    dispatch(_addProducts(data))
  } catch (error) {
    console.log(error)
  }
}

export const editProducts = (product, history) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN)
    const { data } = await axios.put(`/api/products/${product.id}`, product, {
      headers: {
        authorization: token,
      }
    })
    history.push(`/products/${product.id}`)
    dispatch(_editProducts(data))

  } catch (error) {
    console.log(error)
  }
}

export const deleteProducts = (id, history) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN)
    const { data } = await axios.delete(`/api/products/${id}`, {
      headers: {
        authorization: token,
      }
    })
    history.push('/products')
    dispatch(_deleteProducts(data))


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
    case ADD_PRODUCT:
      return [...state,[state.products, action.product]]
    case EDIT_PRODUCT:
      return state.map(product => {
        product.id === action.product.id? (action.product): (product)
      })
    case DELETE_PRODUCT:
      return state.filter(product => {
        product.id !== action.product.id
      })
    default:
      return state
  }
}
