import React from 'react'
import axios from 'axios'
import { injectStripe, CardElement } from 'react-stripe-elements'

class PaymentForm extends React.Component {
	constructor() {
		super()
		this.state = { complete: false, error: '' }
		this.submit = this.submit.bind(this)
	}
	async submit(event) {
		event.preventDefault()
		const { stripe, order } = this.props //assuming order will be passed down here
		const { token } = await stripe.createToken({ name: 'harry' })       //will turn into thunk later //pass in customer name and id for the name  prop
		console.log(token)
		const response = await axios.post('/api/payment/charge', token.id, { headers: { "Content-Type": 'text/plain' } })         //will change route will be passed token id as well as the order total to complete charge
		if (response.data.status === 'succeeded') {
			this.setState({ complete: true })
		}
	}
	render() {
		if (this.state.complete) {
			return <h1>Purchase has been completed</h1>
		}
		return (
			<div>
				<p>Would you like to complete your purchase?</p>
				<CardElement />
				<button onClick={this.submit}>Send</button>
			</div>
		)
	}

}


export default injectStripe(PaymentForm)