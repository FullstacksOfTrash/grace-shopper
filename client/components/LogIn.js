import React from 'react'
import { connect } from 'react-redux'

class LogIn extends React.Component{
    constructor(){
        super()
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    handleSubmit(event){
        event.preventDefault()
    }
    render(){
        const { email, password } = this.state
        const { handleChange, handleSubmit } = this
        console.log(this.state)
        return (
            <form onSubmit={handleSubmit} >
                <label htmlFor='email'>Email: </label>
                <input type='email' name='email' value={email} onChange={handleChange}></input>
                <label htmlFor='password'>Password: </label>
                <input type='password' name='password' value={password} onChange={handleChange}></input>
                <button type='submit'>Log in</button>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loggingIn: (credentials) => dispatch()
    }
}

export default connect(null, mapDispatchToProps)(LogIn)