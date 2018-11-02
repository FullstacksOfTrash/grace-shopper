import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../store/thunks'
import SearchBar from './SearchBar'

import { Drawer } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  // appBar: {
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   marginLeft: drawerWidth,
  // },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  // content: {
  //   flexGrow: 1,
  //   backgroundColor: theme.palette.background.default,
  //   padding: theme.spacing.unit * 3,
  // },
});


class NavBar extends Component {
  render () {
    const { user, loggingOut, history } = this.props
    const { classes } = this.props // from material-ui withStyles
    return (
      <Fragment>
        <Drawer className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left">
        <div>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/products'>Products</Link></li>
            <li><Link to='/cart'>Cart</Link></li>
            <li><Link to='/order-history'>Order History</Link></li>
            <li>{user.id?
              <button onClick={() => loggingOut(history)}>Log out</button> :
              <Link to='/login'>Log in</Link>}
            </li>
          </ul>
          <SearchBar />
        </div>
        </Drawer>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavBar))
