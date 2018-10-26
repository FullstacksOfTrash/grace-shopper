import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getProducts } from '../store'

import Products from './Products'
import ProductDetails from './ProductDetails'

class App extends Component {

  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    return(
      <div>
        <Products />
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
