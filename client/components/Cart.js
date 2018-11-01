import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProduct, lineItemsTotalQuant } from '../store/utils'
import { incrementLineItem, decrementLineItem, deleteLineItem, updateOrder } from '../store/thunks'

class Cart extends Component {
  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubtract = this.handleSubtract.bind(this);
  }

  handleAdd(cart,lineItem) {
    const { incrementLineItem } = this.props;
    return incrementLineItem(cart, lineItem)
  }

  handleSubtract(cart, lineItem) {
    const { deleteLineItem, decrementLineItem } = this.props;
    lineItem.quantity === 1 ? deleteLineItem(cart, lineItem) : decrementLineItem(cart, lineItem);
  }
  render() {
    const { cart, products, totalCost, lineItems } = this.props
    const { handleAdd, handleSubtract } = this
    if(!lineItems.length){
      return <h4>Your cart is current empty. Browse through our wonder array of trash!</h4>
    }
    return (
      <div>
        Review your order:
        <ul>
          {
            lineItems.map(item => (
              <div key={item.id}> 
                <Link to={`/products/${item.productId}`}>
                  {getProduct(item.productId, products).name}
                </Link>
                <li>Quantity: {item.quantity}
                  <button onClick={() => handleAdd(cart, item)}>+</button>
                  <button onClick={() => handleSubtract(cart, item)}>-</button>
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
          <Link to='/checkout'>Checkout</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({orders, products}) => {
  const cart = orders.find(order => order.status === 'CART') || { lineItems: []}
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
    incrementLineItem: (cart, lineItem) => {
      dispatch(incrementLineItem(cart, lineItem))
    },
    decrementLineItem: (cart, lineItem) => {
      dispatch(decrementLineItem(cart, lineItem))
    },
    deleteLineItem: (cart, lineItem) => {
      dispatch(deleteLineItem(cart,lineItem))
    },
    submitCart: (cart) => dispatch(updateOrder(cart))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart)
