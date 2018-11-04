import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProduct, lineItemsTotalQuant } from '../store/utils'
import { Link } from 'react-router-dom'
import { Grid, ButtonBase, Typography, Fade } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

class OrderHistory extends Component {
  render () {
    const {orders, products} = this.props
    if(!orders) { return null }

    return (
      <div>
        <Grid container>
          <Fade in>
            <Typography variant='display1'>
              Order History
            </Typography>
          </Fade>
        </Grid>
        <hr />
        <div>
          <Grid container>
          <Paper width={100}>
          {
            <Typography>
              {
              orders.map(order => (
                <ul key={order.id}>Order# {order.id}
                <li>Total: ${lineItemsTotalQuant(order.lineItems,products)}</li>
                <li>Order Placed: {order.createdAt}</li>
                {
                  order.lineItems.map(item => (
                  <ul key={item.id}>
                    <li><Link to={`/products/${item.productId}`}>{getProduct(item.productId,products).name}</Link> <span> {item.quantity} </span></li>
                  </ul>
                  ))
                }
                </ul>
              ))
              }
            </Typography>
          }
          </Paper>
          </Grid>
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
