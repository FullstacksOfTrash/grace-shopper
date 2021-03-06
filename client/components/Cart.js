import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { getProduct, lineItemsTotalQuant, getLocalCart, findLocalLineItem, guestIncrementLineItem, guestDecrementLineItem } from '../store/utils'
import { incrementLineItem, decrementLineItem, deleteLineItem, updateOrder } from '../store/thunks'
import CartLineItem from './CartLineItem'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button'

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

    if (token) {
      if (cart) {
        incrementLineItem(cart, item)
        // console.log('incrementing')
      } else {
        createLineItem(cart, item)
        // console.log('created')
      }
    } else {
      guestIncrementLineItem({ ...item, id: item.productId })
      this.setState({ reload: !this.state.reload })
    }
  }

  handleSubtract(item) {
    // console.log('item', item)
    const { cart, deleteLineItem, decrementLineItem } = this.props;
    const token = window.localStorage.getItem('token')
    if (token) {
      if (item.quantity === 1) {
        deleteLineItem(cart, item)
        // console.log('deleted')
      } else {
        decrementLineItem(cart, item)
        // console.log('decrementing')
      }
    } else {
      guestDecrementLineItem({ ...item, id: item.productId })
      this.setState({ reload: !this.state.reload })
    }
  }

  render() {


    const { cart, products, lineItems, user, location, classes } = this.props
    let { totalCost } = this.props
    const { handleAdd, handleSubtract } = this
    if (!products.length) { return null }
    const token = window.localStorage.getItem('token')
    let allLineItems;
    if (!token) {
      allLineItems = getLocalCart().lineItems.sort((a, b) => a.productId - b.productId)
      totalCost = totalCost = lineItemsTotalQuant(allLineItems, products)
      // console.log('local cart ', getLocalCart())
    } else {
      allLineItems = cart.lineItems
    }

    if (!allLineItems.length) {
      return <h4>Your cart is current empty. Browse through our wonder array of trash!</h4>
    }
    // console.log(this.props)
    return (
      <div>
        <h4>
          Review your order:
        </h4>

          <Paper >
          <Table >
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell >Single Item Price</TableCell>
                <TableCell >Quantity Ordered</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {allLineItems.map(item => {
                const thisProduct = getProduct(item.productId, products)
                const { name, price } = thisProduct
                const { quantity, productId } = item
                return (
                  <TableRow key={productId}>
                    <TableCell component="th" scope="row">{name}</TableCell>
                    <TableCell >${price * quantity}</TableCell>
                    <TableCell >
                      {quantity}{' '}
                      <button onClick={() => handleAdd(item)} className={location.pathname === '/guestcheckout' || location.pathname === '/checkout'? 'hidden' : ''}>+</button>{' '}
                      <button onClick={() => handleSubtract(item)} className={location.pathname === '/guestcheckout' || location.pathname === '/checkout'? 'hidden' : ''}>-</button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
        <div className='totalCost'>
          Total Cost: ${totalCost}
          <Link style={{paddingLeft: 10}}to='/checkout' className={!user.id || location.pathname === '/guestcheckout' || location.pathname === '/checkout'? 'hidden' : ''}>
            <Button variant="contained" color="primary" className={classes.button}>
              Checkout
            </Button>
          </Link>
          <Link to='/guestcheckout' className={user.id || location.pathname === '/guestcheckout' || location.pathname === '/checkout'? 'hidden' : ''}>
            <Button variant="contained" color="primary" className={classes.button}>
              Guest Checkout
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

const mapStateToProps = ({ orders, products, auth }) => {
  const cart = orders.find(order => order.status === 'CART') || { lineItems: [] }
  let totalCost = 0
  if (cart.id) {
    totalCost = lineItemsTotalQuant(cart.lineItems, products)
  }
  return {
    user: auth.user || {},
    cart,
    lineItems: cart.lineItems.sort((a, b) => a.id - b.id),
    products,
    totalCost
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    incrementLineItem: (cart, lineItem) => {
      dispatch(incrementLineItem(cart, lineItem))
    },
    decrementLineItem: (cart, lineItem) => {
      dispatch(decrementLineItem(cart, lineItem))
    },
    deleteLineItem: (cart, lineItem) => {
      dispatch(deleteLineItem(cart, lineItem))
    },
    submitCart: (cart) => dispatch(updateOrder(cart))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cart)))
