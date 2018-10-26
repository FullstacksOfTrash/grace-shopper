import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavBar extends Component {
  render () {
    return (
      <div>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/products'>Products</Link></li>
          <li><Link to='/cart'>Cart</Link></li>
        </ul>
      </div>
    )
  }
}

export default NavBar
