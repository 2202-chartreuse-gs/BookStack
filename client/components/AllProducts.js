import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../store/products'

const AllProducts = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  let products = useSelector((state) => state.products)
  return (
    <div>
      <ol>
        {products ? (
          products.map((product) => <li key={product.id}>{product.title}</li>)
        ) : (
          <li>No products found.</li>
        )}
      </ol>
    </div>
  )
}

export default AllProducts
