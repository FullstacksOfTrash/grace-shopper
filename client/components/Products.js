import React, { Component } from 'react'
import { connect } from 'react-redux';

import { Link } from 'react-router-dom'

class Products extends Component {

  constructor(props){
    super(props)
    this.state = {
      category: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      category: event.target.value
    })
  }


  render() {

    const { products, categories } = this.props
    const { category } = this.state
    console.log(this.state)
    const { handleChange } = this
    if (!products) { return null }

    return (
      <div>
        <h3>Our Products</h3>
        <hr />
        <div>
          <form>
            <label>Filter by Category: </label>
            <select onChange={handleChange}>
              <option name='category' value='' >All</option>
              {
                categories.map(category => <option key={category.id}name='category' value={category.id}>{category.name}</option>)
              }
            </select>
          </form>
        </div>
        <div>
          { category
          ? <ul>
              {
                products.filter(product => product.categoryId === category*1).map(product => (<li key = { product.id }>
                  <Link to={`/products/${product.id}`} style={{ textDecoration: 'none'}}>
                  { product.name }
                  </Link>
                  </li>
                  ))
              }
            </ul>
          : <ul>
            {

              products.map(product => (<li key = { product.id }>
              <Link to={`/products/${product.id}`} style={{ textDecoration: 'none'}}>
              { product.name }
              </Link>
              </li>
              ))
            }
          </ul>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ products, categories }) => ({
   products,
   categories
  })

export default connect(mapStateToProps)(Products);
