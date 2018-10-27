import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getProductReviews } from '../store/thunks'
import Reviews from './Reviews'

class ProductDetails extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {

    if (!this.props.product) { return null }

    const { name, imageUrl, price, stock, description } = this.props.product
    const { productReviews } = this.props

    // console.log('productreviews: ', productReviews)

    return (
      <div>
        <h3> Introducing the { name }! </h3>
        <hr />
        <ul>
          <li>ImageUrl: { imageUrl }</li>
          <li>Price: $ { price } </li>
          <li>Stock: { stock } </li>
          <li>Description: { description } </li>
        </ul>
        <Reviews productReviews = { productReviews } />
      </div>
    )
  }
}

const mapStateToProps = ({ products, reviews }, { id }) => {
  return {
    product: products.filter( product => product.id === id*1)[0],
    productReviews: reviews.filter(review => id*1 === review.productId)
  }
}

export default connect(mapStateToProps)(ProductDetails)
