import React from 'react'
import { connect } from 'react-redux';
import { createReview } from '../store/thunks'

class ReviewWriter extends React.Component{
    constructor(){
        super()
        this.state = {
            rating: 0,
            text: '',
            userId: 0
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
        const { saveReview } = this.props
        const { id } = this.props // gets the product id

        event.preventDefault()
        saveReview(id, this.state)
        this.setState = {
            rating: 0,
            text: '',
            userId: ''
        }
    }

    render(){
        // const { user } = this.props.auth // get's the logged-in user to pass to create review

        console.log(this.state)
        
        const { handleChange, handleSubmit } = this
        const { rating, text } = this.state
        return (
            <div>
                <hr />
                <h4>Write a review for this product</h4>
                <form onSubmit={ handleSubmit }>
                    <label htmlFor='rating'>Rating:</label>{' '}
                    <input name='rating' onChange={handleChange} value={rating}></input>{' '}
                    <label htmlFor='text'>Tell us about this product:</label>{' '}
                    <input name='text' onChange={handleChange} value={text}></input>{' '}
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = (dispatch) => ({
    saveReview: (id, review) => dispatch(createReview(id, review))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewWriter)