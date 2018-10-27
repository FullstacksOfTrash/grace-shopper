import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getProduct } from '../store'
import Reviews from './Reviews'

class ProductDetails extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {

    if (!this.props.product) { return null }

    const { name, imageUrl, price, stock, description, reviews} = this.props.product

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
        <Reviews reviews={reviews} />
      </div>
    )
  }
}

const mapStateToProps = ({ products }, { id }) => {
  console.log(getProduct(id, products))
  return {
    products,
    product: getProduct(id, products)
  }
}

export default connect(mapStateToProps)(ProductDetails)
