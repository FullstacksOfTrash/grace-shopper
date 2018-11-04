import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { getProduct } from '../store/utils';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '90%',
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class CartLineItem extends Component {

  render() {

    const { classes } = this.props;
    const { item, product } = this.props;
    const { quantity } = item
    const { name, price } = product

    const itemDisplay = `Your Item: ${name}`
    const priceDisplay = `Item Price: ${price}`
    const quantityDisplay = `Quantity Ordered: ${quantity}`


    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem>      
            <ListItemText primary={itemDisplay} />
            <ListItemText primary={priceDisplay} />
            <ListItemText primary={quantityDisplay} />
          </ListItem>
        </List>
        <Divider />
      </div>
    );
  }
}

CartLineItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ products }, { item }) => ({
  product: getProduct(item.productId, products)
})

export default connect(mapStateToProps)(withStyles(styles)(CartLineItem));