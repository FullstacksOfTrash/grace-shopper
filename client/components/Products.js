import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { queryFilter } from '../store/utils'

import ProductCard from './ProductCard'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";


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

    const { products, categories, admin, classes } = this.props
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
          <br />
        </div>
        {admin ? <Link to='/addProduct'><button>Add Product</button></Link> : null}
        <div>
          {
            <Grid container>
              <Grid item xs={12}>
                <Grid container spacing={40}>
                  {category ?
                    products.filter(product => product.categoryId === category * 1).map(product => (
                      <Grid key={product.id} item>
                        <Paper height={100} width={140} />
                        <ProductCard key={product.id} id={product.id} />
                      </Grid>))
                    :
                      products.map(product => (
                        <Grid key={product.id} item>
                          <Paper height={100} width={140} />
                          <ProductCard key={product.id} id={product.id} />
                        </Grid>
                      ))
                    }
                </Grid>
              </Grid>
            </Grid>
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