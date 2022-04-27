import React, { Component, useState, useRef, useEffect } from 'react'
import { fetchSingleProduct } from '../../store/singleProduct'
import { editProducts, deleteProducts } from '../../store/products'
import { useSelector, useDispatch } from 'react-redux'




const EditProduct = props => {
  const { history } = props
  const dispatch = useDispatch()
  let { singleProduct } = useSelector((store) => store)

  const userRef = useRef();
  const [imageURL, setImageURL] = useState(singleProduct.imageURL)
  const [productURL, setProductURL] = useState(singleProduct.productURL)
  const [title, setTitle] = useState(singleProduct.title)
  const [author, setAuthor] = useState(singleProduct.author)
  const [price, setPrice] = useState(singleProduct.price)
  const [description, setDescription] = useState(singleProduct.description)

  useEffect(() => {
    userRef.current.focus();
  },[])

  const handleSubmit = (evt) => {
    evt.preventDefault()
          const id = singleProduct.id
          const imageURL = evt.target.imageURL.value
          const productURL = evt.target.productURL.value
          const title = evt.target.title.value
          const author = evt.target.author.value
          const price = evt.target.price.value
          const description = evt.target.description.value

          dispatch(editProducts({ id, imageURL, productURL, title, author, price, description }, history))
  }


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
      <button type="submit">
      Edit Product</button>
      <button type="button">
      Delete Product</button>
    </form>
    </>
  )
}
export default EditProduct







