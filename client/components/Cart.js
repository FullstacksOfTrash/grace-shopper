import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCart, getProduct, lineItemsTotalQuant } from '../store/utils'
import { addToCart, removeFromCart, updateOrder } from '../store/thunks'


class Cart extends Component {


  render() {

    const { cart, products, totalCost, addToCart, removeFromCart, lineItems, submitCart, history } = this.props
    if(!cart) {
      return null
    }
    console.log(cart)
    return (
      <div>
        Review your order:
        <ul>
          {
            lineItems.map(item => (
              <div key={item.id}> {getProduct(item.productId, products).name}
                <li>Quantity: {item.quantity}
                  <button onClick={() => addToCart(cart, null, item)}>+</button>
                  <button onClick={() => removeFromCart(cart, item)}>-</button>
                </li>
                <li>Price: ${getProduct(item.productId, products).price}</li>
                <li>Subtotal: ${item.quantity * getProduct(item.productId, products).price}</li>
              </div>
          ))
          }
        </ul>
        <div>
          Total Cost: ${totalCost}
        </div>
        <div>
          <button onClick={() => {
            submitCart(cart)
            .then(() => history.push('/order-history'))
          }}>Submit Order</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({orders, products}) => {
  const cart = orders.filter(order => order.userId === 1).find(order => order.status === 'CART') || { lineItems: []}
  let totalCost = 0
  if(cart.id) {
    totalCost = lineItemsTotalQuant(cart.lineItems,products)
  }
  return {
    cart: orders.filter(order => order.userId === 1).find(order => order.status === 'CART'),
    lineItems: cart.lineItems.sort((a, b) => a.id - b.id),
    products,
    totalCost
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
    submitCart: (cart) => dispatch(updateOrder(cart))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart)
