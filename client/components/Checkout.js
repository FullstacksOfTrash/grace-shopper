import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StripeProvider, Elements } from 'react-stripe-elements'
import { Redirect } from 'react-router-dom'

import { stripeKey1 } from '../../config'
import { lineItemsTotalQuant } from '../store/utils'
import Payment from './Payment'
import Cart from './Cart'
import { submitOrder, updateOrder } from '../store/thunks'


class CheckoutPage extends Component {
  constructor(){
    super()
    this.state = {
      stripeKey: null
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount(){
    this.setState({
      stripeKey: process.env.STRIPE_KEY1
    })
  }
  handleChange(event){
    this.setState = {
      [event.target.name] : event.target.value
    }
  }
  render(){ 
    const { cart, sum, products, user, submitOrder, updateOrder } = this.props
    const { stripeKey } = this.state
    if(!cart.lineItems.length){
      return <Redirect to='/cart'/>
    }
    return (
      <div className={!cart.lineItems? 'hidden' : ''}>
        <Cart />
        <StripeProvider apiKey={stripeKey}>
          <Elements>
            <Payment sum={sum} user={user} cart={cart} submitOrder={submitOrder} updateOrder={updateOrder}/>
          </Elements>
        </StripeProvider>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { orders, products, auth } = state
  const cart = orders.find(order => order.status === 'CART') || { lineItems: []}
  const sum = lineItemsTotalQuant(cart.lineItems, products)
  return {
    products,
    cart,
    sum,
    user: auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitOrder: (order, data) => dispatch(submitOrder(order, data)),
    updateOrder: order => dispatch(updateOrder(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)