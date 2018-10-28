import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCart, getProduct } from '../store/utils'

class Cart extends Component {


  render() {

    const { cart, products, totalCost } = this.props
    if(!cart) { return null }
    console.log(cart)
    return (
      <div>
        Review your order:
        <ul>
          {
            cart.lineItems.map(item => (
              <div key={item.id}> {getProduct(item.productId, products).name}
                <li>Quantity: {item.quantity}                 <button>+</button>
                <button>-</button>
                </li>
                <li>Cost: ${item.quantity * getProduct(item.productId, products).price}</li>
              </div>
          ))
          }
        </ul>
        <div>
          Total Cost: ${totalCost}
        </div>
        <div>
          <button>Continue to Checkout</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({orders, products}) => {
  const cart = orders.filter(order => order.userId === 1).find(order => order.status === 'CART')
  let totalCost = 0
  if(cart) {
    totalCost = cart.lineItems.reduce( (acc, item) => {
      return acc + item.quantity * getProduct(item.productId, products).price
    },0)
  }
  return {
    cart: orders.filter(order => order.userId === 1).find(order => order.status === 'CART'),
    products,
    totalCost
  }
}

export default connect(mapStateToProps)(Cart)
