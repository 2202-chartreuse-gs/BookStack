import React from 'react'
import { connect } from 'react-redux'

import { fetchSingleProduct } from '../store/singleProduct'

class SingleProduct extends React.Component {
  componentDidMount() {
    try {
      const productId = this.props.match.params.productId
      this.props.loadSingleProduct(productId)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const product = this.props.product

    return (
      <div id="single-product" className="column">
        <div id="single-product-details" className="row">
          <div className="column mr1">
            {product ? (
              <div>
                <h1>{product.title}</h1>
                <h2>{product.author}</h2>
                <p>{product.descrption}</p>
                <p>{product.price}</p>
                <img src={product.imageURL} />
              </div>
            ) : (
              'Not Found'
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.singleProduct,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
