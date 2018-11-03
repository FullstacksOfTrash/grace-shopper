import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../store/thunks'
import SearchBar from './SearchBar'

import { Drawer, Divider, Button } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail'

class NavBar extends Component {
  render () {
    const { user, loggingOut, history } = this.props
    const { classes } = this.props // from material-ui withStyles
    return (
      <Fragment>
        <Divider />
        <Divider />
        <List>
            <Link to='/'>
              <ListItem button>
                <ListItemIcon><MailIcon /></ListItemIcon>
                <ListItemText primary='Home'/>
              </ListItem>
            </Link>
            <Link to='/products'>
              <ListItem button>
                <ListItemIcon><MailIcon /></ListItemIcon>
                <ListItemText primary='Products'/>
              </ListItem>
            </Link>
            <Link to='/cart'>
              <ListItem button>
                <ListItemIcon><MailIcon /></ListItemIcon>
                <ListItemText primary='Cart'/>
              </ListItem>
            </Link>
            <Link to='/order-history'>
              <ListItem button>
                <ListItemIcon><MailIcon /></ListItemIcon>
                <ListItemText primary='Order History'/>
              </ListItem>
            </Link>
            {
              user.id
                ? <ListItem>
                    <Button onClick={()=> loggingOut(history)}>Log out</Button>
                  </ListItem>
                : <Link to='/login'>
                    <ListItem>
                      <Button>Log in</Button>
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
