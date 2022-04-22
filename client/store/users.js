import axios from 'axios'
import history from '../history'
const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_ALL_USERS = 'SET_ALL_USERS'

/**
 * ACTION CREATORS
 */
const setAllUsers = (users) => ({ type: SET_ALL_USERS, users })

/**
 * THUNK CREATORS
 */

export const fetchAllUsers = () => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN)
    const { data } = await axios.get('/api/users/', {
      headers: {
        authorization: token,
      },
    })
    return dispatch(setAllUsers(data))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function usersReducer(state = [], action) {
  switch (action.type) {
    case SET_ALL_USERS:
      return [...action.users]
    default:
      return state
  }
}
