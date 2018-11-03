import React from 'react'
import { connect } from 'react-redux'
//import { withRouter } from 'react-router-dom'
import { _query } from '../store/actionCreators'

import { withStyles } from '@material-ui/core/styles'
import { InputBase } from '@material-ui/core'
import styles from './SearchBar.styles'

class SearchBar extends React.Component{
  constructor(){
    super()
    this.state = {
      query: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleQuery = this.handleQuery.bind(this)
    this.reset = this.reset.bind(this)
  }
  handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    })
  }
  handleQuery(event){
    const { location, history, query } = this.props
    if(event.key === 'Enter'){
      query(this.state.query)
      this.setState({ query: '' })
      if(location.pathname !== '/products') history.push('/products')
    }
  }
  reset(event){
    event.preventDefault()
    this.setState({ query : '' })
    this.props.reset()
  }
  render(){ 
    const { query } = this.state
    const { handleChange, handleQuery } = this
    const { classes } = this.props

    return (
      <div>
          <div className={classes.search}>
          <div className={classes.searchIcon}/>
          <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }} onChange={handleChange} onKeyPress={handleQuery} value={query} name='query' />
          </div>
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    query: state.query
  }
}

const mapDispatchToProps = dispatch => {
  return {
    query : (string) => dispatch(_query(string))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchBar))
