import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../store/thunks'
import SearchBar from './SearchBar'

class NavBar extends Component {
  render () {
    const { user, loggingOut, history } = this.props
    return (
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
