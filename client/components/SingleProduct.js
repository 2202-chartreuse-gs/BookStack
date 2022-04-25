import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { setCart } from '../store/cart'
// import AppBar from '@material-ui/core/AppBar'
// import Button from '@material-ui/core/Button'
// import IconButton from '@material-ui/core/IconButton'
// import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
// import Card from '@material-ui/core/Card'
// import CardActionArea from '@material-ui/core/CardActionArea'
// import CardActions from '@material-ui/core/CardActions'
// import CardContent from '@material-ui/core/CardContent'
// import CardMedia from '@material-ui/core/CardMedia'
// import CssBaseline from '@material-ui/core/CssBaseline'
// import Grid from '@material-ui/core/Grid'
// import Toolbar from '@material-ui/core/Toolbar'
// import Typography from '@material-ui/core/Typography'
// import { makeStyles } from '@material-ui/core/styles'
// import Container from '@material-ui/core/Container'
// import Link from '@material-ui/core/Link'
import { fetchSingleProduct } from '../store/singleProduct'
import { useParams } from 'react-router-dom'

const SingleProduct = () => {
  //allows dispatch to Redux store
  const dispatch = useDispatch()

  const { productId } = useParams()
  //useEffect React hook
  useEffect(() => {
    // getAndSetLocalCart()
    dispatch(fetchSingleProduct(productId))
  }, [])

  let { singleProduct } = useSelector((store) => store)

  return (
    <div id="single-product" className="column">
      <div id="single-product-details" className="row">
        <div className="column mr1">
          {singleProduct ? (
            <div>
              <h1>{singleProduct.title}</h1>
              <h2>{singleProduct.author}</h2>
              <p>{singleProduct.descrption}</p>
              <p>{'$' + singleProduct.price / 100}</p>
              <img src={singleProduct.imageURL} />
            </div>
          ) : (
            'Not Found'
          )}
        </div>
      </div>
    </div>
  )
}

export default SingleProduct
// class SingleProduct extends React.Component {
//   componentDidMount() {
//     try {
//       const productId = this.props.match.params.productId
//       this.props.loadSingleProduct(productId)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   render() {
//     const product = this.props.product
//     return (
//       <div id="single-product" className="column">
//         <div id="single-product-details" className="row">
//           <div className="column mr1">
//             {product ? (
//               <div>
//                 <h1>{product.title}</h1>
//                 <h2>{product.author}</h2>
//                 <p>{product.descrption}</p>
//                 <p>{product.price}</p>
//                 <img src={product.imageURL} />
//               </div>
//             ) : (
//               'Not Found'
//             )}
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     product: state.singleProduct,
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loadSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
