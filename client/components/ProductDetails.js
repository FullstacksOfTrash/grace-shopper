import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { getProduct, getCart, lineItemFinder, tracker, findLocalLineItem, guestIncrementLineItem, guestDecrementLineItem} from '../store/utils'
import { addToCart, removeFromCart, getProductReviews, createLineItem, incrementLineItem, deleteLineItem, decrementLineItem, deleteProduct } from '../store/thunks'
import ProductModal from './ProductModal'
import Reviews from './Reviews'
import ReviewWriter from './ReviewWriter'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import { Paper, Typography, Tooltip } from '@material-ui/core'
import { Card, CardHeader, CardMedia, CardContent, CardActions} from '@material-ui/core'
import { Eject, MoreVertIcon, Edit, Delete } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';



const styles = theme => ({
  // root: {
  //   ...theme.mixins.gutters(),
  //   paddingTop: theme.spacing.unit * 2,
  //   paddingBottom: theme.spacing.unit * 2,
  // },
  paper: {
    padding: 50,
    marginTop: 10,
    marginBottom: 10
  },
    card: {
    maxWidth: 1000,
    minWidth: 400,
  },
  CardMedia: {
    height: 300,
  },
  CardContent: {
    margin: '20 30 0 30'
  },
  CardActions: {
    margin: '0 30 20 30'  
  },
});


class ProductDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lineItem: {},
      error: ''
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubtract = this.handleSubtract.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { init } = this.props;
    const token = window.localStorage.getItem('token')
    if(!token){
      this.setState({
        lineItem: findLocalLineItem(this.props.id)
      })
    }
    init();
  }

  componentDidUpdate(prevProps){

    if(prevProps !== this.props) {
      console.log('should updated')
    }
  }

  handleAdd() {
    const { cart, product, lineItem, createLineItem, incrementLineItem, id, localCart, auth } = this.props;
    const token = window.localStorage.getItem('token')

    if(token){
      if(lineItem){
        incrementLineItem(cart, lineItem)
        console.log('incrementing')
      } else {
        createLineItem(cart, product)
        console.log('created')
      }
    } else {
      guestIncrementLineItem(product)
      this.setState({
        lineItem: findLocalLineItem(id)
      })
    }
  }

  handleSubtract() {
// <<<<<<< styleproduct
    const { cart, lineItem, deleteLineItem, decrementLineItem } = this.props;
    
    if(lineItem ? lineItem.quantity === 1 : null){
      deleteLineItem(cart, lineItem)
      console.log('deleted')
// =======
//     const { cart, lineItem, deleteLineItem, decrementLineItem, product, id } = this.props;
//     const token = window.localStorage.getItem('token')
//     if(token){
//       if(lineItem ? lineItem.quantity === 1 : null){
//         deleteLineItem(cart, lineItem)
//         console.log('deleted')
//       } else {
//         decrementLineItem(cart, lineItem)
//         console.log('decrementing')
//       }
// >>>>>>> master
    } else {
      guestDecrementLineItem(product)
      this.setState({
        lineItem: findLocalLineItem(id)
      })
    }
  }

  handleDelete(){
    this.props.deleteProduct(this.props.product)
    this.props.history.push('/products')
  }

  render() {
    if (!this.props.product) { return null }
    const token = window.localStorage.getItem('token')
    const { name, imageUrl, smallImageUrl, price, stock, description, id } = this.props.product
    const { addToCart, removeFromCart, lineItem, cart, product, reviews, admin, localCart } = this.props
    const { classes } = this.props;

    const { handleAdd, handleSubtract, handleDelete } = this;
    const outOfStock = (lineItem && stock <= lineItem.quantity) || 0;
    let noQuantity;
    if(token){
      noQuantity = !lineItem || !lineItem.quantity
    } else {
      noQuantity = !this.state.lineItem || !this.state.lineItem.quantity
    }

    console.log('state ', this.state)
    return (
      <Fragment>
      <div>
        <Card className={classes.card}>

            <CardHeader
              avatar={'https://images.unsplash.com/photo-1528190336454-13cd56b45b5a'}
              // action={editButton}
              title={<Typography variant='display1' className={classes.title}>{name}</Typography>}
            />


            <CardMedia 
              image={'https://images.unsplash.com/photo-1528190336454-13cd56b45b5a'}
              className={CardMedia}
            />


            <CardContent className={CardContent}>
              <Typography variant='subheading'>
                Address
              </Typography>
              <Typography>
                {'address'}
              </Typography>
              <Typography variant='subheading'>
                Description
              </Typography>
              <Typography>
                {'description'}
              </Typography>
            </CardContent>

            <CardActions className={CardActions}>
              <Fragment>
                <Tooltip title='Delete'>
                  {/* <IconButton onClick={toggleDeleteDialog}> */}
                  <IconButton >

                    <Delete />
                  </IconButton>
                </Tooltip>
              </Fragment>
            </CardActions>

          </Card>
        <Paper className={classes.paper} elevation={1}>
        <h3> Introducing the { name }! </h3>
        <hr />
        { admin ?
        <div>
          <Link to={`/product/${this.props.id}/edit`}><button>Edit Product</button></Link>
          <button onClick={handleDelete}>Delete Product</button>
        </div>
        : <div></div>
        }
        <ul>
          <li>
            <ProductModal imageUrl = { imageUrl } productName = { product.name } />
          </li>
          <li>Price: $ {price} </li>
          <li>Stock: {stock ? 'In stock' : 'Out of stock'} </li>
          <li>Description: {description} </li>
        </ul>
        <hr />

        <button onClick={handleAdd} disabled={outOfStock}>+</button>
        <button onClick={handleSubtract} disabled={noQuantity}>-</button>
        {
          lineItem
          ? <p>Quantity in cart: {lineItem ? lineItem.quantity : 0 }</p>
          : <p>Quantity in cart: {this.state.lineItem ? this.state.lineItem.quantity : 0 }</p>
        }
        </Paper>
        <Reviews />
        <ReviewWriter id = { id } />
        
      </div>
      </Fragment>
    )
  }
}


const mapStateToProps = ({ products, orders, reviews, auth }, { id }) => {
  const cart = getCart(orders)
  let lineItem;

  if(cart){
    lineItem = lineItemFinder(cart.lineItems, id)
  }

  return {
    cart,
    lineItem,
    reviews,
    product: getProduct(id, products),
    admin: auth.user.admin
  }
}


const mapDispatchToProps = (dispatch, { id })=> {
  console.log(id)
  return {
    init: () => dispatch(getProductReviews( id )),
    createLineItem: (cart, product)=> dispatch(createLineItem(cart, product)),
    incrementLineItem: (cart, lineItem)=> dispatch(incrementLineItem(cart, lineItem)),
    deleteLineItem: (cart, lineItem)=> dispatch(deleteLineItem(cart, lineItem)),
    decrementLineItem: (cart, lineItem)=> dispatch(decrementLineItem(cart, lineItem)),
    deleteProduct: (product) => dispatch(deleteProduct(product))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductDetails))

