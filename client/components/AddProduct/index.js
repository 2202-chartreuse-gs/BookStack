import { Button } from '@material-ui/core'
import React, { useRef, useState, useEffect, Component, Fragment } from 'react'
import {connect} from 'react-redux'
import { authenticate, products } from '../../store'
// import './index.css'
import { addProducts } from '../../store/products'


/**
 * Component
 */

const AddProduct = props => {
  //imageUrl , productUrl, title, author, price, description
  const { handleSubmit } = props
  const userRef = useRef();
  const [imageURL, setImageURL] = useState('')
  const [productURL, setProductURL] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')

  useEffect(() => {
    userRef.current.focus();
  },[])

  // console.log(addProducts, "add product first thunk" )
  return (
    <>
    <form className='add_product' onSubmit={handleSubmit} >
      <div>
        <label htmlFor='imageURL'>
          <small>imageURL</small>
        </label>
        <input name='imageURL' type='text' placeholder='imageURL' ref={userRef} onChange={(evt) => setImageURL(evt.target.value)} value={imageURL} required />
      </div>
      <div>
        <label htmlFor='productURL'>
          <small>productURL</small>
        </label>
        <input name='productURL' type='text' placeholder='productURL' onChange={(evt) => setProductURL(evt.target.value)} value={productURL} required />
      </div>
      <div>
        <label htmlFor='title'>
          <small>title</small>
        </label>
        <input name='title' type='text' placeholder='Title' onChange={(evt) => setTitle(evt.target.value)} value={title} required />
      </div>
      <div>
        <label htmlFor='author'>
          <small>author</small>
        </label>
        <input name='author' type='text' placeholder='Author' onChange={(evt) => setAuthor(evt.target.value)} value={author} required />
      </div>
      <div>
        <label htmlFor='price'>
          <small>price</small>
        </label>
        <input name='price' type='text' placeholder='price' onChange={(evt) => setPrice(evt.target.value)} value={price} required />
      </div>
      <div>
        <label htmlFor='description'>
          <small> description </small>
        </label>
        <input name='description' type='text' placeholder='description' onChange={(evt) => setDescription(evt.target.value)} value={description} />
      </div>
      <Button type="submit">
      Add Product</Button>
    </form>
    </>
  )
}


const mapDispatch = (dispatch, { history }) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const imageURL = evt.target.imageURL.value
      const productURL = evt.target.productURL.value
      const title = evt.target.title.value
      const author = evt.target.author.value
      const price = evt.target.price.value
      const description = evt.target.description.value

      dispatch(addProducts({imageURL, productURL, title, author, price, description }, history))
    }
  }
}


export default connect(null, mapDispatch)(AddProduct)
