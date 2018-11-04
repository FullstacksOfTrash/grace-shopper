import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';

import { getProducts, getCategories, getOrders } from '../store/thunks'
// import { getProducts, getAllReviews, getCategories, getOrders } from '../store/thunks'

import { HashRouter as Router, Route, withRouter } from 'react-router-dom'
import { exchangeTokenForAuth } from '../store/thunks'

import NavBar from './NavBar'
import Products from './Products'
import ProductDetails from './ProductDetails'
import LogIn from './LogIn'
import Cart from './Cart'
import OrderHistory from './OrderHistory'
import SignUp from './SignUp'
import CheckOut from './Checkout'
import ProductForm from './ProductForm'
import Home from './Home'
import SearchBar from './SearchBar'

import { withStyles } from '@material-ui/core/styles'
import styles from './App.styles';
import { Typography, Toolbar, IconButton, AppBar, Drawer, Divider, InputBase, CircularProgress } from '@material-ui/core'
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { Search } from '@material-ui/icons'

class App extends Component {

  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const { user } = this.props
    const { classes } = this.props; // material-ui
    return (
      <div className={classes.root}>
        <Router>
          <Fragment>
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                  Fullstacks of Trash
                </Typography>
                
                <div className={classes.grow} />
                <Route path='/' component={SearchBar} />
          

              </Toolbar>
            </AppBar>
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{ paper: classes.drawerPaper }}
              anchor="left"
            >
              <div className={classes.toolbar} />
              <Route render={(props) => <NavBar {...props}/>} />
            </Drawer>

            <main className={classes.content}>
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
            </main>

          </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
