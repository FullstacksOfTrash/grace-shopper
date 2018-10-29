import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getProduct, getCart, lineItemFinder, tracker } from '../store/utils'
// import { getProduct, getProductReviews, getCart, lineItemFinder } from '../store/utils'

import { addToCart, removeFromCart } from '../store/thunks'
import Reviews from './Reviews'
import ReviewWriter from './ReviewWriter'

class ProductDetails extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {

    if (!this.props.product) { return null }

    const { name, imageUrl, price, stock, description, reviews, id } = this.props.product
    const { addToCart, removeFromCart, item, cart, product } = this.props

    return (
      <div>
        <h3> Introducing the { name }! </h3>
        <hr />
        <ul>
          <li>ImageUrl: { imageUrl }</li>
          <li>Price: $ { price } </li>
          <li>Stock: { stock? 'In stock' : 'Out of stock' } </li>
          <li>Description: { description } </li>
        </ul>
        <hr />
        <button onClick={() => addToCart(cart, product, item)} disabled={stock <= (item.quantity || 0) ? true : false }>+</button>
        <button onClick={() => removeFromCart(cart, item)} disabled={!item.quantity}>-</button>
        <p>Quantity in cart: {item.quantity || 0}</p>
        <hr />
        <Reviews reviews = { reviews } />
        <ReviewWriter id = { id } />
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => { 
  const { products, orders } = state
  const { id } = ownProps
  const cart = getCart(orders)
  let lineItem;
  if(cart){
    lineItem = lineItemFinder(cart.lineItems, id)
  }
  return {
    cart: cart,
    item: lineItem || {}, //being defensive
    product: getProduct(id, products)
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    addToCart: (cart, product, lineItem)=> {
      return dispatch(addToCart(cart, product, lineItem))
    },
    removeFromCart: (cart, lineItem)=> {
      return dispatch(removeFromCart(cart, lineItem))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)

// export const removeFromCart = (cart, lineItem)=> {
