import React, { Component } from 'react'
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom'
import { getProducts, getAllReviews } from '../store'
import NavBar from './NavBar'
import Products from './Products'
import ProductDetails from './ProductDetails'
import LogIn from './LogIn'

class App extends Component {

  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Route component={NavBar} />
            <Route exact path='/' component={LogIn} />
            <Route exact path='/products' component={Products} />
            <Route exact path='/products/:id' render={({ match }) => <ProductDetails id={match.params.id} />} />

          </div>
        </Router>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  init: () => {
    dispatch(getProducts());
    dispatch(getAllReviews());
  }
})

export default connect(null, mapDispatchToProps)(App);
