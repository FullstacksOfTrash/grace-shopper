import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getProduct, getCart, lineItemFinder } from '../store/utils'
// import { getProduct, getProductReviews, getCart, lineItemFinder } from '../store/utils'

import { addToCart, removeFromCart } from '../store/thunks'
import Reviews from './Reviews'

class ProductDetails extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {

    if (!this.props.product) { return null }

    const { name, imageUrl, price, stock, description, reviews } = this.props.product
    // const { name, imageUrl, price, stock, description } = this.props.product
    const { addToCart, removeFromCart, item, cart, product } = this.props

    // const { productReviews, addToCart, removeFromCart, item, cart, product } = this.props
    // console.log('productreviews: ', productReviews)

    return (
      <div>
        <h3> Introducing the { name }! </h3>
        <hr />
        <ul>
          <li>ImageUrl: { imageUrl }</li>
          <li>Price: $ { price } </li>
          <li>Stock: { stock } </li>
          <li>Description: { description } </li>
        </ul>
        <hr />
        <button onClick={() => addToCart(cart, product, item)}>+</button>
        <button onClick={() => removeFromCart(cart, item)} disabled={!item.quantity}>-</button>
        <p>Quantity in cart: {item.quantity || 0}</p>
        <hr />
        <Reviews reviews = { reviews } />
        {/* <Reviews productReviews = { productReviews } /> */}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => { //({ products, reviews }, { id }) 
  // const { products, orders, reviews } = state
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
    product: getProduct(id, products),
    // productReviews: getProductReviews(id, reviews)
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
