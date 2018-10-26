import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getProducts } from '../store'
import ProductDetails from './ProductDetails'

class App extends Component {

  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {

    const { products } = this.props
    if (!products) { return null }

    return (
      <div>
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

const mapDispatchToProps = dispatch => ({
  init: () => {
    dispatch(getProducts());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);