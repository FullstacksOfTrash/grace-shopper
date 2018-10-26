import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getProducts } from '../store'
import ProductDetails from './ProductDetails'

class Products extends Component {

  render() {

    const { products } = this.props
    if (!products) { return null }

    return (
      <div>
        <h3>Our Products</h3>
        <hr />
        {
          products.map(product => <ProductDetails key={product.id} product = { product } />
          )
        }
      </div>
    )
  }
}

const mapStateToProps = ({ products }) => ({ products })

export default connect(mapStateToProps)(Products);