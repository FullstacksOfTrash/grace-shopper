import React, { Component } from 'react'
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import { getProducts } from '../store'
import { exchangeTokenForAuth } from '../reducers/authReducer'
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
    const { user } = this.props
    const loggedIn = user.id? true : false
    return (
      <div>
        <Router>
          <div>
            <Route component={NavBar} />
            {/* <Route exact path='/' render={() => (loggedIn? <Redirect to='/products' /> : <LogIn />) }/> mixed on this functionality. if user logs in, it will not render the log in page. However home link becomes unusable */}
            <Route exact path='/products' component={Products} />
            <Route exact path='/products/:id' render={({ match }) => <ProductDetails id={match.params.id} />} />
            <Route path='/login' component={LogIn}/>
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  console.log(auth)
  return {
    user: auth.user
  }
}

const mapDispatchToProps = dispatch => ({
  init: () => {
    dispatch(exchangeTokenForAuth())
    dispatch(getProducts());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
