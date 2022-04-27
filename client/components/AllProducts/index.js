import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../../store/products'
import { setCart, fetchCart, updateDBCart } from '../../store/cart'
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
import './index.css'

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

const AllProducts = () => {
  //useSelector hook pulls from Redux store
  let { products, cart, auth } = useSelector((store) => store)
  const [search, setSearch] = useState('');

  //allows dispatch to Redux store
  const dispatch = useDispatch()
  //useEffect React hook
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  useEffect(() => {
    auth.id ? getUserCart(auth.id) : getAndSetLocalCart()
  }, [auth])

  //Material UI styles hook
  const classes = useStyles()

  //updates the cart in the redux store
  const updateStoreCart = async (productId, product, qty = 1) => {
    //gets the current cart from the store
    const tempCart = { ...cart }
    //now update the store and local storage
    //copies the current cart
    //checks for the item and updates quantity or adds the item to the cart
    tempCart.items[productId]
      ? (tempCart.items[productId].qty += qty)
      : (tempCart.items[productId] = { ...product, qty })
    //counts the total items added to the cart
    tempCart.totalItems += qty
    //dispatches and returns the updated cart to the redux store
    dispatch(setCart(tempCart))
    //if user is logged in, send the data to the database through the store
    if (tempCart.userId === auth.id) {
      //this is the total count of the product after the addition, necessary to update the database.
      const updatedQty = tempCart.items[productId].qty
      await dispatch(updateDBCart(auth.id, productId, updatedQty, productId))
    }
    return tempCart
  }

  //this performs the basic function of adding to the cart in local storage, esp. useful for by users not logged in.
  const updateLocalCart = (cart) => {
    if (window.localStorage) {
      window.localStorage.setItem('bookStackCart', JSON.stringify(cart))
    } else {
      if (!auth) {
        alert(
          'Sorry, your browser does not support this feature. Try creating an account first.'
        )
      }
    }
  }

  const getUserCart = async (id) => {
    const userCart = await dispatch(fetchCart(id))
    updateLocalCart(userCart)
  }

  const getAndSetLocalCart = () => {
    if (window.localStorage && window.localStorage.getItem('bookStackCart')) {
      let browserCart = window.localStorage.getItem('bookStackCart')
      browserCart = JSON.parse(browserCart)
      dispatch(setCart(browserCart))
    }
  }

  const handleAddToCart = async (productId, product, qty = 1) => {
    const tempCart = await updateStoreCart(productId, product, qty)
    //even if our user is logged in, we'll save a copy of the cart to local storage.
    updateLocalCart(tempCart)
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <>
      <div className='product-app'>
        <div className="product-search">
          <h1 className='product-text'>Search a product</h1>
            <form>
              <input type="text" placeholder="Search a product" className="product-input" onChange={handleChange}/>
            </form>
        </div>
      </div>

      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {products ? (
            filteredProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={product.imageURL}
                    title={product.title + ' cover'}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.title}
                    </Typography>
                    <Typography>
                      {product.author ? 'By ' + product.author : null}
                    </Typography>
                    <Typography
                      className={classes.productPrice}
                      align="right"
                      variant="h6"
                      component="h6"
                    >
                      {'$' + product.price / 100}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <Link href={'/products/' + product.id}>
                      <Button size="small" color="primary">
                        View Details
                      </Button>
                    </Link>
                    <IconButton
                      color="primary"
                      aria-label="add to shopping cart"
                      onClick={() => handleAddToCart(product.id, product)}
                    >
                      <AddShoppingCartIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <h5>No Products Found</h5>
          )}
        </Grid>
      </Container>
    </>
  )
}

export default AllProducts
