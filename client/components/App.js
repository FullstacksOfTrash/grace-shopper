import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getProducts, getCategories, getOrders } from '../store/thunks'
// import { getProducts, getAllReviews, getCategories, getOrders } from '../store/thunks'

import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import { exchangeTokenForAuth } from '../store/thunks'

import NavBar from './NavBar'
import Products from './Products'
import ProductDetails from './ProductDetails'
import LogIn from './LogIn'
import Cart from './Cart'
import OrderHistory from './OrderHistory';
import SignUp from './SignUp'

class App extends Component {

  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const { user } = this.props
    const loggedIn = user.id ? true : false
    return (
      <div>
        <Router>
          <div>
            <Route component={NavBar} />
            <Route exact path='/products' component={Products} />
            <Route exact path='/products/:id' render={({ match }) => <ProductDetails id={match.params.id} />} />
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={LogIn}/>
            <Route path='/cart' render={({history}) => <Cart history={history}/>} />
            <Route path='/order-history' component={OrderHistory} />
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {

  return {
    user: auth.user
  }
}

const mapDispatchToProps = dispatch => ({
  init: () => {
    dispatch(exchangeTokenForAuth())
    dispatch(getProducts());
    // dispatch(getProductReviews());
    dispatch(getCategories());
    dispatch(getOrders())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);