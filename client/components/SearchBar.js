import React from 'react'

class SearchBar extends React.Component{
  constructor(){
    super()
    this.state = {
      query: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleQuery = this.handleQuery.bind(this)
  }
  handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    })
  }
  handleQuery(event){
    event.preventDefault()

  }
  render(){ 
    const { query } = this.state
    const { handleChange, handleQuery } = this

    return (
      <form onSubmit={handleQuery}>
        <label htmlFor='query'>Search: </label>
        <input name='query' value={query} onChange={handleChange}></input>
        <button type='submit'>x</button>
      </form>
    )
  }
}

export default SearchBar