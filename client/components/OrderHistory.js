import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProduct, lineItemsTotalQuant } from '../store/utils'

class OrderHistory extends Component {
  render () {
    const {orders, products} = this.props
    if(!orders) { return null }

    return (
      <div>
        <h3>Order History</h3>
        <div>
          {
            orders.map(order => (
              <ul key={order.id}>Order# {order.id}
              <li>Total: ${lineItemsTotalQuant(order.lineItems,products)}</li>
              <li>Order Placed: {order.createdAt}</li>
              {
                order.lineItems.map(item => (
                <ul key={item.id}>
                  <li>{getProduct(item.productId,products).name} - {item.quantity}</li>
                </ul>
                ))
              }
              </ul>
            ))
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({orders, products}) => {


  return {
    orders: orders.filter(order => order.status === 'ORDER'),
    products
  }
}

export default connect(mapStateToProps)(OrderHistory)
