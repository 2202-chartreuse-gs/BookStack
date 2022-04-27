import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCart, setCart } from '../store/cart'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}))

const CartProducts = () => {
  const [cartArray, setCartArray] = useState([])
  const [cartTotal, setCartTotal] = useState(0)

  //useEffect React hook
  useEffect(() => {
    getAndSetLocalCart()
    //dispatch(setCart())
  }, [])

  //useSelector hook pulls from Redux store
  let { cart } = useSelector((store) => store)

  useEffect(() => {
    cart ? mapCartData(cart) : null
    //dispatch(setCart())
  }, [cart])

  //allows dispatch to Redux store
  const dispatch = useDispatch()

  //material UI styles hook
  const classes = useStyles()

  const mapCartData = (cart) => {
    if (cart.items) {
      const array = []
      Object.keys(cart.items).forEach((productId) => {
        let item = cart.items[productId]
        array.push(item)
        // cartArray.push(cart.items[productId])
        setCartTotal((prevTotal) => prevTotal + item.qty * item.price)
      })
      setCartArray([...array])
    }
  }

  const getAndSetLocalCart = () => {
    if (window.localStorage && window.localStorage.getItem('bookStackCart')) {
      let browserCart = window.localStorage.getItem('bookStackCart')
      browserCart = JSON.parse(browserCart)
      dispatch(setCart(browserCart))
    }
  }

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <List disablePadding>
          {cartArray.map((product) => (
            <ListItem className={classes.listItem} key={product.title}>
              <ListItemText
                primary={product.title}
                secondary={`${product.qty} @ $${product.price / 100}`}
              />
              <ListItemText />
              <Typography variant="body2">{`$ ${
                (product.price * product.qty) / 100
              }`}</Typography>
            </ListItem>
          ))}
          <ListItem className={classes.listItem}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" className={classes.total}>
              {`$ ${cartTotal / 100}`}
            </Typography>
          </ListItem>
        </List>
        <Link href="/checkout/">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Place Order
          </Button>
        </Link>
      </Paper>
    </main>
  )
}

export default CartProducts
