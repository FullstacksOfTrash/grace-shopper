import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { queryFilter } from '../store/utils'
import { _resetQuery } from '../store/actionCreators'
import Category from './Category'

import ProductCard from './ProductCard'
import { Grid, ButtonBase, Typography, Fade } from "@material-ui/core";
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

    const { products, categories, admin, classes, found, query, reset } = this.props
    const { category } = this.state
    const { handleChange } = this
    if (!products) { return null }

    return (
      <div>
        <Grid container>
        <Fade in>
          <ButtonBase onClick={reset}>
            <Typography variant='display1'>
              Our Products
            </Typography>
          </ButtonBase>
        </Fade>
        </Grid>
        <hr />
        <div>
          <Category handleChange={handleChange} value={category} categories={categories}/>
          {/* <form>
            <label>Filter by Category: </label>
            <select onChange={handleChange}>
              <option name='category' value=''>All</option>
              {
                categories.map(category => <option key={category.id} name='category' value={category.id}>{category.name}</option>)
              }
            </select>
          </form> */}
          <br />
        </div>
        {admin ? <Link to='/addProduct'><button>Add Product</button></Link> : null}
        <h3 className={found? 'hidden' : ''}>{`We did not find any products for the search of "${query}"`}</h3>
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
  let filteredProducts
  let found = true
  if (query) {
    filteredProducts = queryFilter(query, products)
    found = filteredProducts.length > 0? true : false
  }
  console.log(filteredProducts)
  return {
    query, 
    found,
    products: query ? filteredProducts : products,
    categories,
    admin: auth.user.admin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reset : () => dispatch(_resetQuery())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Products);