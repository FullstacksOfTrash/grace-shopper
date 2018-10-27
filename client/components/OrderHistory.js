import React, { Component } from 'react'
import { connect } from 'react-redux'

class OrderHistory extends Component {
  render () {
    const {orders} = this.props
    if(!orders) { return null }

    return (
      <div>
        <h3>Order History</h3>
      </div>
    )
  }
}

const mapStateToProps = ({orders}) => {
  return {
    orders: orders.filter(order => order.status === 'ORDER')
  }
}

export default connect(mapStateToProps)(OrderHistory)
