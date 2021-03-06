import React from 'react'
import { injectStripe, CardElement } from 'react-stripe-elements'
import { removeLocalCart, getLocalCart } from '../store/utils'
import { Button } from '@material-ui/core'

class PaymentForm extends React.Component{
    constructor(){
        super()
        this.state = { complete: false, error: '', loading: false }
        this.submit = this.submit.bind(this)
    }
    async submit(event){
        event.preventDefault()
        const { stripe , sum, cart, submitOrder, updateOrder} = this.props //assuming order will be passed down here
        const { token } = await stripe.createToken({name: 'Anonymous User'})       
        const response = await submitOrder(cart, { tokenId: token.id, sum, cartId: cart.id})     
        if(response.status === 'succeeded'){
            this.setState({complete: true, order: response.order})
            removeLocalCart()
            getLocalCart()
        }
    }
    render(){ 
        const { order } = this.state
        if(this.state.complete){
            return <h4>Purchase has been completed. Besure to look out for an email regarding order#{order.id}!</h4>
        }
        return (
            <div>
                <p>Would you like to complete your purchase?</p>
                <CardElement/>
                <div style={{paddingBottom: 20}}></div>
                <Button styles={{paddingTop: 50}} variant="contained" color="primary" onClick={this.submit}>Send</Button>
            </div>
        )
    }
}

export default injectStripe(PaymentForm)