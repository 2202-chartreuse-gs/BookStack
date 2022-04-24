import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../store/products'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import CameraIcon from '@material-ui/icons/PhotoCamera'
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

const AllProducts = () => {
  //useState hook gives us a local cart to work with
  const [localCart, setLocalCart] = useState({ totalItems: 0 })

  //useDispatch hook for Redux store
  const dispatch = useDispatch()

  //useEffect React hook
  useEffect(() => {
    getAndSetLocalCart()
    dispatch(fetchProducts())
  }, [])

  //useSelector hook to get products from Redux store
  let products = useSelector((store) => store.products)

  //Material UI styles hook
  const classes = useStyles()

  //this performs the basic function of adding to the cart in local storage, for use by users not logged in
  const addToLocalCart = (itemId, qty = 1) => {
    console.log(localCart.totalItems)
    localCart.totalItems += qty
    const tempCart = { ...localCart }
    tempCart[itemId] ? (tempCart[itemId] += qty) : (tempCart[itemId] = qty)
    setLocalCart(tempCart)
    if (window.localStorage) {
      window.localStorage.setItem('bookStackCart', JSON.stringify(localCart))
    } else {
      alert(
        'Sorry, your browser does not support this feature. Try creating an account instead'
      )
    }
  }

  const getAndSetLocalCart = () => {
    if (window.localStorage && window.localStorage.getItem('bookStackCart')) {
      let browserCart = window.localStorage.getItem('bookStackCart')
      browserCart = JSON.parse(browserCart)
      setLocalCart(browserCart)
    }
  }

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {products ? (
          products.map((product) => (
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
                  <Typography>By {product.author}</Typography>
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
                    onClick={() => addToLocalCart(product.id)}
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
  )
}

export default AllProducts
