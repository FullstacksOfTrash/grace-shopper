import React, { Component } from 'react'
import { connect } from 'react-redux'

class CreateProduct extends Component{
  render(){
    return (
      <div>
        <h4>Sell a new product!</h4>
        <form>
          <div>
            <label>Name: </label>
            <input name='name' />
          </div>
          <div>
            <label>Price: </label>
            <input name='name' />
          </div>
          <div>
            <label>Stock: </label>
            <input name='name' />
          </div>
          <div>
            <label>Description: </label>
            <input name='name' />
          </div>
          <div>
            <label>Image: </label>
            <input type='fileReader'/>
          </div>
          <div>
            <button>Add Product</button>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateProduct
