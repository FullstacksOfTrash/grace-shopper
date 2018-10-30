import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCart, getProduct, lineItemsTotalQuant } from '../store/utils'
import { addToCart, removeFromCart, updateOrder } from '../store/thunks'
import { Link } from 'react-router-dom'

class Cart extends Component {



  render() {

    const { cart, products, totalCost, addToCart, removeFromCart, lineItems, submitCart, history } = this.props

    console.log('render')
    if(!cart) {
      console.log('no cart')
      return null
    }

    return (
      <div>
        Review your order:
        <ul>
          {
            lineItems.map(item => (
              <div key={item.id}> <Link to={`/products/${item.productId}`}>{getProduct(item.productId, products).name}</Link>
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

const mapStateToProps = ({orders, products,auth}) => {
  console.log('auth user id ', auth.user.id)
  const cart = orders.filter(order => order.userId === auth.user.id).find(order => order.status === 'CART') || { lineItems: []}
  console.log(cart)
  let totalCost = 0
  if(cart.id) {
    totalCost = lineItemsTotalQuant(cart.lineItems,products)
  }
  return {
    cart,
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
