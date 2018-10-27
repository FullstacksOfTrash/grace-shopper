import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getProduct } from '../store'

class ProductDetails extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {

    if (!this.props.product) { return null }

    const { name, imageUrl, price, stock, description } = this.props.product

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
      </div>
    )
  }
}

const mapStateToProps = ({ products }, { id }) => {
  return {
    products,
    product: getProduct(id, products)
  }
}

export default connect(mapStateToProps)(ProductDetails)
