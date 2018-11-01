import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProduct } from '../store/thunks'

class ProductForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      name: '',
      price: 0,
      stock: 0,
      description: '',
      imageUrl: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){

  }

  componentDidUpdate(prevProps){
    const { editProduct, product } = this.props
    if(prevProps !== this.props && editProduct && product.id){
      console.log('update product ', product)
      this.setState(product)
    }
  }


  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault()
    this.props.createProduct(this.state)
  }

  render(){
    const { name, price, stock, description, imageUrl}  = this.state
    const { handleChange, handleSubmit } = this
    const { editProduct } = this.props
    console.log('state ', this.state)
    return (
      <div>
        <h4>Sell a new product!</h4>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name: </label>
            <input name='name' value={name} onChange={handleChange}/>
          </div>
          <div>
            <label>Price: $</label>
            <input name='price' value={price} onChange={handleChange}/>
          </div>
          <div>
            <label>Stock: </label>
            <input name='stock' value={stock} onChange={handleChange}/>
          </div>
          <div>
            <label>Description: </label>
            <input name='description' value={description} onChange={handleChange}/>
          </div>
          <div>
            <label>Image: </label>
            <input type='file' name='imageUrl' value={imageUrl} onChange={handleChange}/>
          </div>
          <div>
            <button type='submit' > {editProduct ? 'Edit Product' : 'Add Product'}</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({products}, {location, match}) => {
  return {
    product: products.find(product => product.id === match.params.id*1),
    editProduct: location.pathname === `/product/${match.params.id}/edit`,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProduct: (product) => dispatch(createProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm)
