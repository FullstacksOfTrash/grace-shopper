import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getProduct, getCart, lineItemFinder, tracker } from '../store/utils'
// import { getProduct, getProductReviews, getCart, lineItemFinder } from '../store/utils'

import { addToCart, removeFromCart, getProductReviews } from '../store/thunks'
import Reviews from './Reviews'
import ReviewWriter from './ReviewWriter'

class ProductDetails extends Component {

  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {

    if (!this.props.product) { return null }

    const { name, imageUrl, price, stock, description, id } = this.props.product
    const { addToCart, removeFromCart, item, cart, product, reviews } = this.props

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
        <Reviews />
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
    product: getProduct(id, products),
    reviews: state.reviews
  }
}

// init: (ownProps.id) => return dispatch(getProductReviews(parseInt(productId))),

const mapDispatchToProps = (dispatch, ownProps)=> {
  return {
    init: () => {
      dispatch(getProductReviews(ownProps.id));
    },
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