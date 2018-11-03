import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { queryFilter } from '../store/utils'

import ProductCard from './ProductCard'
import { withStyles } from '@material-ui/core/styles';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

class Products extends Component {

  constructor(props) {
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

    const { products, categories, admin } = this.props
    const { category } = this.state
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
              <option name='category' value=''>All</option>
              {
                categories.map(category => <option key={category.id} name='category' value={category.id}>{category.name}</option>)
              }
            </select>
          </form>
        </div>
        {admin ? <Link to='/addProduct'><button>Add Product</button></Link> : null}
        <div>
          {category
            ? <ul>
              {
                products.filter(product => product.categoryId === category * 1).map(product => (<li key={product.id}>
                  <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                    {product.name}
                  </Link>
                </li>
                ))
              }
            </ul>
            :
            <GridList cols={3} spacing={100}>
              {products.map(product => (
                  <ProductCard key={product.id} id={product.id} />

              ))}
            </GridList>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ products, categories, auth, query }) => {
  console.log(products)
  let filteredProducts;
  if (query) {
    filteredProducts = queryFilter(query, products)
  }
  console.log(filteredProducts)
  return {
    products: query ? filteredProducts : products,
    categories,
    admin: auth.user.admin
  }
}

export default connect(mapStateToProps)(Products);
// export default connect(mapStateToProps)(withStyles(styles)(Products));
