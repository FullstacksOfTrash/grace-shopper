import React, { Component } from 'react'
import { connect } from 'react-redux';

class ProductDetails extends Component {

  render() {

    const { name, price, imageUrl, stock, description } = this.props.product

    return (
      <div>
        <ul>
          <li>Name: { name } </li>
          <li>ImageUrl: { imageUrl }</li>
          <li>Price: $ { price } </li>
          <li>Stock: { stock } </li>
          <li>Description: { description } </li>
        </ul>
      </div>
    )
  }
}

export default connect()(ProductDetails)
