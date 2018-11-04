import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StripeProvider, Elements } from 'react-stripe-elements'
import { Redirect } from 'react-router-dom'

import { stripeKey1 } from '../../config'
import { lineItemsTotalQuant, getLocalCart } from '../store/utils'
import GuestPayment from './GuestPayment'
import CurrentOrder from './CurrentOrder'
import Cart from './Cart'
import { guestSubmit } from '../store/thunks'


class CheckoutPage extends Component {
  constructor(){
    super()
    this.state = {
      address: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event){
    this.setState = {
      [event.target.name] : event.target.value
    }
  }
  render(){ 
    const { cart, sum, products, submitOrder, updateOrder } = this.props
    console.log(cart)
    console.log(sum)
    if(!cart.lineItems.length){
      return <Redirect to='/cart'/>
    } 
    return (
      <div className={!cart.lineItems? 'hidden' : ''}>
        <h4>Total: {`$${sum}`}</h4>
        <Cart />
        {/* <CurrentOrder products={products} cart={cart}/> */}
        {/* <label htmlFor='address'>Address:</label>
        <input onChange={this.handleChange} name='address' value={this.state.address}></input> */}
        <StripeProvider apiKey={stripeKey1}>
          <Elements>
            <GuestPayment sum={sum} cart={cart} submitOrder={submitOrder} updateOrder={updateOrder}/>
          </Elements>
        </StripeProvider>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { products } = state
  const cart = { lineItems: getLocalCart().lineItems.sort((a, b) => a.productId - b.productId) }
  const sum = lineItemsTotalQuant(cart.lineItems , products)
  
  return {
    products,
    cart,
    sum,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitOrder: (order, data) => dispatch(guestSubmit(order, data)),
    updateOrder: order => dispatch(updateOrder(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)