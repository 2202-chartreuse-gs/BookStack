import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../store/products'
import { setCart } from '../store/cart'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '133%',
    backgroundSize: 'contain',
  },
  cardContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  productPrice: {
    paddingTop: '.5em',
  },
  cardActions: {
    justifyContent: 'space-between',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}))

const CartProducts = () => {
  //allows dispatch to Redux store
  const dispatch = useDispatch()

  //useEffect React hook
  useEffect(() => {
    // getAndSetLocalCart()
    dispatch(fetchProducts())
  }, [])

  //useSelector hook pulls from Redux store
  let { cartProducts } = useSelector((store) => store)

  //Material UI styles hook
  // const classes = useStyles()

  //this performs the basic function of adding to the cart in local storage, for use by users not logged in
  // const addToLocalCart = (productId, product, qty = 1) => {
  //   const tempCart = { ...cart }
  //   tempCart[productId]
  //     ? (tempCart[productId].qty += qty)
  //     : (tempCart[productId] = { ...product, qty })
  //   tempCart.totalItems += qty
  //   dispatch(setCart(tempCart))
  //   if (window.localStorage) {
  //     window.localStorage.setItem('bookStackCart', JSON.stringify(tempCart))
  //   } else {
  //     alert(
  //       'Sorry, your browser does not support this feature. Try creating an account first.'
  //     )
  //   }
  // }

  // const getAndSetLocalCart = () => {
  //   if (window.localStorage && window.localStorage.getItem('bookStackCart')) {
  //     let browserCart = window.localStorage.getItem('bookStackCart')
  //     browserCart = JSON.parse(browserCart)
  //     dispatch(setCart(browserCart))
  //   }
  // }

  return (
    <table>
      <tbody>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price Per Item</th>
          <th>Total Price</th>
        </tr>
        {cartProducts ? (
          cartProducts.map((product) => (
            <tr>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.price * product.quantity}</td>
            </tr>
          ))
        ) : (
          <h5>No Products In Your Cart. Buy Something!</h5>
        )}
        <tr>Total Price: </tr>
      </tbody>
    </table>
  )
}

export default CartProducts
