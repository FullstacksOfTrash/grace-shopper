import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StripeProvider, Elements } from 'react-stripe-elements'
import { Redirect } from 'react-router-dom'

import { key1 } from '../../apiKeys'
import { lineItemsTotalQuant } from '../store/utils'
import Cart from './Cart'
import Payment from './Payment'



class CheckoutPage extends Component {
  render(){ 
    const { cart, sum } = this.props
    console.log(cart.lineItems)
    if(!cart.lineItems){
      return <Redirect to='/cart' />
    }

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

const mapStateToProps = state => {
  const { orders, products } = state
  const cart = orders.find(order => order.status === 'CART') || { lineItems: []}
  const sum = lineItemsTotalQuant(cart.lineItems, products)
  return {
    cart,
    sum
  }
}


export default connect(mapStateToProps, null)(CheckoutPage)