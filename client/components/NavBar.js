import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../store/thunks'
import SearchBar from './SearchBar'

import { Drawer, Divider, Button } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Home, HotTub, Cake, ShoppingCart, Assignment } from '@material-ui/icons'

class NavBar extends Component {
  render () {
    const { user, loggingOut, history } = this.props
    const { classes } = this.props // from material-ui withStyles
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
                <ListItemIcon><ShoppingCart /></ListItemIcon>
                <ListItemText primary='Cart'/>
              </ListItem>
            </Link>
            <Link to='/order-history'>
              <ListItem button>
                <ListItemIcon><Assignment /></ListItemIcon>
                <ListItemText primary='Order History'/>
              </ListItem>
            </Link>
            <Divider />
            {
              user.id
                ? <ListItem>
                    <Button onClick={()=> loggingOut(history)} variant="contained" color="primary">Log out</Button>
                  </ListItem>
                : <Link to='/login'>
                    <ListItem>
                      <Button variant="contained" color="secondary">Log in</Button>
                    </ListItem>
                  </Link>
            }
            
        </List>
          <SearchBar />
      </Fragment>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loggingOut: (history) => dispatch(logOut(history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
