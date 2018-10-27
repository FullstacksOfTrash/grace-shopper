import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getProducts } from '../store'
import ProductDetails from './ProductDetails'

import { Link } from 'react-router-dom'

class Products extends Component {

  render() {

    const { products } = this.props
    if (!products) { return null }

    return (
      <div>
        <h3>Our Products</h3>
        <hr />
        <ul>
        {
          // products.map(product => <ProductDetails key={product.id} product = { product } />)
          products.map(product => (<li key = { product.id }>
          <Link to={`/products/${product.id}`} style={{ textDecoration: 'none'}}>
          { product.name }
          </Link>
          </li>
          ))
        }
                </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ products }) => ({ products })

export default connect(mapStateToProps)(Products);