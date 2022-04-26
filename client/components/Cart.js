import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCart, setCart } from '../store/cart'

const CartProducts = () => {
  //allows dispatch to Redux store
  const dispatch = useDispatch()

  //useEffect React hook
  useEffect(() => {
    // getAndSetLocalCart()
    dispatch(setCart())
  }, [])

  //useSelector hook pulls from Redux store
  let { cart } = useSelector((store) => store)

  const getAndSetLocalCart = () => {
    if (window.localStorage && window.localStorage.getItem('bookStackCart')) {
      let browserCart = window.localStorage.getItem('bookStackCart')
      browserCart = JSON.parse(browserCart)
      dispatch(setCart(browserCart))
    }
  }

  return (
    <table>
      <tbody>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price Per Item</th>
          <th>Total Price</th>
        </tr>
        {cart.items ? (
          Object.keys(cart).forEach((product) => {
            ;<tr>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.price * product.quantity}</td>
            </tr>
          })
        ) : (
          <h5>No Products In Your Cart. Buy Something!</h5>
        )}
        {/* {cart.items ? (
          cart.map((product) => (
            <tr>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.price * product.quantity}</td>
            </tr>
          ))
        ) : (
          <h5>No Products In Your Cart. Buy Something!</h5>
        )} */}
        <tr>Total Price: </tr>
      </tbody>
    </table>
  )
}

export default CartProducts
