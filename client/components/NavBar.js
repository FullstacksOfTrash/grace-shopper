import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../store/thunks'
import { getCartQuantity, totalCart } from '../store/utils'

import { Drawer, Divider, Button } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText, Badge, withStyles } from '@material-ui/core';
import { Home, HotTub, Cake, ShoppingCart, Assignment } from '@material-ui/icons'

const styles = theme => ({
  badge: {
    top: 1,
    right: -15,
    // The border color match the background color.
    // border: `2px solid ${
    //   theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    // }`,
  },
});

class NavBar extends Component {
  render () {
    const { user, loggingOut, history, quantity, location, classes, totalItems} = this.props
    // console.log(this.props)
    return (
      <Fragment>
        <Divider />
        <List>
            <Link to='/'>
              <ListItem button>
                <ListItemIcon><Home /></ListItemIcon>
                <ListItemText primary='Home'/>
              </ListItem>
            </Link>
            <Link to='/products'>
              <ListItem button>
                <ListItemIcon><HotTub /></ListItemIcon>
                <ListItemText primary='Dumpster'/>
              </ListItem>
            </Link>
            <Link to='/cart'>
              <ListItem button>
                <ListItemIcon>
                  { totalItems? <Badge className={classes.badge} badgeContent={totalItems} color='secondary' className={totalItems? '' : ''}>
                    <ShoppingCart />
                  </Badge> : <ShoppingCart />}
                </ListItemIcon>
                <ListItemText primary='Cart'/>
              </ListItem>
            </Link>
            {
              user.password
                ? <Link to='/order-history'>
                    <ListItem button>
                      <ListItemIcon><Assignment /></ListItemIcon>
                      <ListItemText primary='Order History'/>
                    </ListItem>
                  </Link>
                : null
            }
            <Divider />
            {
              user.id
                ? <ListItem>
                    <Button onClick={()=> loggingOut(history)} variant="contained" color="primary">Log out</Button>
                  </ListItem>
                : location.pathname === '/login' || location.pathname === 'signup'? null :
                 <Link to='/login'>
                    <ListItem>
                      <Button variant="contained" color="secondary">Log in</Button>
                    </ListItem>
                  </Link>
            }
            
        </List>
        {/* <SearchBar /> */}
      </Fragment>
    )
  }
}

const mapStateToProps = ({ auth, orders }) => {
  const cart = orders.find(order => order.status === 'CART') || { lineItems: [] }
  let lineItems
  if(cart.id){
    lineItems = totalCart(cart.lineItems)
  }
  return {
    user: auth.user,
    totalItems : lineItems
  }
}


const mapDispatchToProps = dispatch => {
  return {
    loggingOut: (history) => dispatch(logOut(history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavBar))
