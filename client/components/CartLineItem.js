import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getProduct } from '../store/utils';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


class CartLineItem extends Component {

  render() {

    const { classes } = this.props;
    const { item, product } = this.props;
    const { quantity } = item
    const { name, price, id } = product

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell >Single Item Price</TableCell>
              <TableCell >Quantity Ordered</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={id}>
              <TableCell component="th" scope="row">{name}</TableCell>
              <TableCell >{price}</TableCell>
              <TableCell >{quantity}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }
};

CartLineItem.propTypes = {
  classes: PropTypes.object.isRequired,
}

  const mapStateToProps = ({ products }, { item }) => ({
    product: getProduct(item.productId, products)
  })

export default connect(mapStateToProps)(withStyles(styles)(CartLineItem));