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
import CheckOut from './Checkout'
import ProductForm from './ProductForm'
import Home from './Home'

class App extends Component {

  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const { user } = this.props
    return (
      <div>
        <Router>
          <div>
            <Route render={(props) => <NavBar {...props}/>} />
            <Route exact path='/' render={(props) => <Home user={user}/>} />
            <Route exact path='/products' component={Products} />
            <Route exact path='/products/:id' render={({ match, history }) => <ProductDetails id={match.params.id} history={history}/>} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/login' component={LogIn}/>
            <Route exact path='/cart' render={({history}) => <Cart history={history}/>} />
            <Route exact path='/order-history' component={OrderHistory} />
            <Route exact path='/addProduct' component={ProductForm} />
            <Route exact path='/product/:id/edit' component={ProductForm} />
            <Route exact path='/checkout' render={(props) => <CheckOut {...props} />} />
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
