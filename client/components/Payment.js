import React from 'react'
import { injectStripe, CardElement } from 'react-stripe-elements'
import Button from '@material-ui/core/Button';

class PaymentForm extends React.Component{
    constructor(){
        super()
        this.state = { complete: false, error: '' }
        this.submit = this.submit.bind(this)
        this.confirm = false;
    }
    async submit(event){
        event.preventDefault()
        const { stripe , sum, user, cart, submitOrder, updateOrder} = this.props //assuming order will be passed down here
        const { token } = await stripe.createToken({name: `${user.firstName} ${user.lastName}`})       
        const response = await submitOrder(cart, { tokenId: token.id, sum, cartId: cart.id})       
        if(response.status === 'succeeded'){
            this.setState({complete: true, confirm: true })
            // setTimeout(() => updateOrder(cart), 5000)
            // updateOrder(cart)
            console.log(this.state);
        }
    }
    render(){ 
        const { confirm } = this.state
        const { cart, updateOrder } = this.props
        if(this.state.complete){
            return (
                <div>
                <h4>Purchase has been completed. Besure to look out for an email regarding order#{cart.id}!</h4>
                {
                    confirm
                        ? <button onClick={()=> updateOrder(cart)}>Confirm</button>
                        : null
                }
                </div>
            )
        }
        return (
            <div>
                <p>Would you like to complete your purchase?</p>
                <CardElement/>
                <div style={{paddingBottom: 20}}></div>
                <Button variant="contained" color="primary" onClick={this.submit}>Send</Button>
            </div>
        )
    }
}


export default injectStripe(PaymentForm)