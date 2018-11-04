import React from 'react'
import { Link } from 'react-router-dom'
import { getProduct } from '../store/utils'

class CurrentOrder extends React.Component{

  render(){
    const { cart, products } = this.props
    return (
      <div>
        <ul>
          {cart.lineItems.map(lineItem => {
            const { id, name } = getProduct(lineItem.productId, products)
            return (
              <li key={id}>
                <Link to={`/products/${id}`}>{name}</Link>
                <div>Quantity in cart: {lineItem.quantity}</div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

}

export default CurrentOrder
