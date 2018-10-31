import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StripeProvider, Elements } from 'react-stripe-elements'

import { key1 } from '../../apiKeys'
import Cart from './Cart'
import Payment from './Payment'


class CheckoutPage extends Component {
  render(){ 
    console.log(this.props)
    return (
      <div>
        <StripeProvider apiKey={key1}>
              <Elements>
                <Payment/>
              </Elements>
            </StripeProvider>
      </div>
    )
  }
}

export default CheckoutPage

// <h3>Checkout (# Items)</h3>
//         <hr/>
//         <div>Shipping Address:</div>
//           <form>
//             <label>First Name: </label>
//             <input name='firstName' />
//             <label>Street Address</label>
//             <input name='address'/>
//           </form>