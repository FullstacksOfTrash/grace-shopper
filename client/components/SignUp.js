import React from 'react'
import { connect } from 'react-redux'
import { signUp } from '../store/thunks'

class SignUp extends React.Component{
    constructor(){
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            address:''
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
        const { signUp, history } = this.props
        return signUp(this.state, history)
    }
    render(){
        const { handleChange, handleSubmit } = this
        const { firstName, lastName, email, password, address } = this.state
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='firstName'>First name: </label>
                    <input type='text' name='firstName' value={firstName} onChange={handleChange}></input>
                    <label htmlFor='lastName'>Last name: </label>
                    <input type='text' name='lastName' value={lastName} onChange={handleChange}></input>
                    <label htmlFor='email'>Email:  </label>
                    <input type='email' name='email' value={email} onChange={handleChange}></input>
                    <label htmlFor='password'>Password:   </label>
                    <input type='password' name='password' value={password} onChange={handleChange}></input>
                    <label htmlFor='address'>Address:  </label>
                    <input type='text' name='address' value={address} onChange={handleChange}></input>
                    <button type='submit'>Create account</button>
                </form>
            </div>

        )

    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp : (userInfo, history) => dispatch(signUp(userInfo, history))
    }
}

export default connect(null, mapDispatchToProps)(SignUp)
