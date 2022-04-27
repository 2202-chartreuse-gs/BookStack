import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSingleProduct } from '../store/singleProduct'
import { useParams, Link } from 'react-router-dom'

const SingleProduct = () => {
  //allows dispatch to Redux store
  const dispatch = useDispatch()
  //pulls up the productId from URL
  const { productId } = useParams()
  //useEffect React hook
  useEffect(() => {
    // getAndSetLocalCart()
    dispatch(fetchSingleProduct(productId))
  }, [])

  let { singleProduct, auth } = useSelector((store) => store)

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
              <div>
              <Link to={`/products/${singleProduct.id}/edit`}>
                {auth.isAdmin ? (
                  <button>
                    Edit ME
                  </button>
                  ) : ( null )
                }
              </Link>

              </div>
            </div>
          ) : (
            'Not Found'
          )}
        </div>
      </div>
    </div>
  )
}

// const mapState = (state) => {
//   return {
//     isAdmin: !!state.auth.isAdmin
//   }
// }

export default SingleProduct
