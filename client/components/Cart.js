import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProduct, lineItemsTotalQuant, getLocalCart, findLocalLineItem, guestIncrementLineItem, guestDecrementLineItem } from '../store/utils'
import { incrementLineItem, decrementLineItem, deleteLineItem, updateOrder } from '../store/thunks'

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      reload: false
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubtract = this.handleSubtract.bind(this);
  }

  handleAdd(item) {
    const { cart, createLineItem, incrementLineItem, id } = this.props;
    const token = window.localStorage.getItem('token')

    if(token){
      if(cart){
        incrementLineItem(cart, item)
        console.log('incrementing')
      } else {
        createLineItem(cart, item)
        console.log('created')
      }
    } else {
      guestIncrementLineItem({...item, id: item.productId})
      this.setState({reload: !this.state.reload})
    }
  }

  handleSubtract(item) {
    console.log('item', item)
    const { cart, deleteLineItem, decrementLineItem } = this.props;
    const token = window.localStorage.getItem('token')
    if(token){
      if(item.quantity === 1){
        deleteLineItem(cart, item)
        console.log('deleted')
      } else {
        decrementLineItem(cart, item)
        console.log('decrementing')
      }
    } else {
      guestDecrementLineItem({...item, id: item.productId})
      this.setState({reload: !this.state.reload})
    }
  }

  render() {
    const { cart, products, lineItems, user } = this.props
    let { totalCost } = this.props
    const { handleAdd, handleSubtract } = this
    if(!products.length){ return null }
    const token = window.localStorage.getItem('token')
    let allLineItems;
    if(!token){
      allLineItems = getLocalCart().lineItems.sort((a,b) => a.productId - b.productId)
      totalCost = totalCost = lineItemsTotalQuant(allLineItems,products)
      console.log('local cart ', getLocalCart())
    } else {
      allLineItems = cart.lineItems
    }

    if(!allLineItems.length){
      return <h4>Your cart is current empty. Browse through our wonder array of trash!</h4>
    }
    return (
      <div>
        Review your order:
        <ul>
          {
            allLineItems.map(item => (
              <div key={item.productId}>
                <Link to={`/products/${item.productId}`}>

                  {getProduct(item.productId, products).name}
                </Link>
                <li>Quantity: {item.quantity}
                  <button onClick={() => handleAdd(item)}>+</button>
                  <button onClick={() => handleSubtract(item)}>-</button>
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
          <Link to='/checkout' className={user.id? '' : 'hidden'}>Checkout</Link>
          <Link to='/guestcheckout' className={user.id? 'hidden': ''}>Guest Checkout</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({orders, products, auth}) => {
  const cart = orders.find(order => order.status === 'CART') || { lineItems: []}
  let totalCost = 0
  if(cart.id) {
    totalCost = lineItemsTotalQuant(cart.lineItems,products)
  }
  return {
    user: auth.user || {},
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
