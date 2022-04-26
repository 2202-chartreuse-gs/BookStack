import React, { Component } from 'react'
import { fetchSingleProduct } from '../../store/singleProduct'
import { editProducts, deleteProducts } from '../../store/products'
import { connect } from 'react-redux'

class EditProduct extends Component {
  constructor(props) {
    this.state = {
      imageURL: '',
      productURL: '',
      title: '',
      author: '',
      price: 0,
      description: '',
    }
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id)
  }

  render() {
    return <div>Hey</div>
  }
}
