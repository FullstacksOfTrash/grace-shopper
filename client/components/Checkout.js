import React, { Component } from 'react'
import { connect } from 'react-redux'

class CheckoutPage extends Component {
  render(){
    return (
      <div>
        <h3>Checkout (# Items)</h3>
        <hr/>
        <div>Shipping Address:</div>
          <form>
            <label>First Name: </label>
            <input name='firstName' />
            <label>Street Address</label>
            <input name='address'/>
          </form>
      </div>
    )
  }
}

export default CheckoutPage
