import React from 'react'
import { injectStripe, CardElement } from 'react-stripe-elements'
import { Redirect } from 'react-router-dom'


class PaymentForm extends React.Component{
    constructor(){
        super()
        this.state = { complete: false, error: '' }
        this.submit = this.submit.bind(this)
    }
    async submit(event){
        event.preventDefault()
        const { stripe , sum, user, cart, submitOrder, updateOrder} = this.props //assuming order will be passed down here
        const { token } = await stripe.createToken({name: `${user.firstName} ${user.lastName}`})       
        const response = await submitOrder(cart, { tokenId: token.id, sum, cartId: cart.id})       
        if(response.status === 'succeeded'){
            this.setState({complete: true})
            setTimeout(() => updateOrder(cart), 5000)
        }
    }
    render(){ 
        const { cart } = this.props
        if(this.state.complete){
            return <h4>Purchase has been completed. Besure to look out for an email regarding order#{cart.id}!</h4>
        }
        return (
            <div>
                <p>Would you like to complete your purchase?</p>
                <CardElement/>
                <button onClick={this.submit}>Send</button>
            </div>
        )
    }
}


export default injectStripe(PaymentForm)