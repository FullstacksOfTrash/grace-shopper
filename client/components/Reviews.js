import React from 'react'
import { connect } from 'react-redux'

class Reviews extends React.Component{

    render(){

        const { reviews } = this.props
        if (!reviews.length) {
            return <div>There are no reviews for this product. Be the first to write one!</div>
        }
        return (
            <div>
                <h4>Reviews</h4>
                <ul>
                    {reviews.map(review => {
                        return (
                            <div key={review.id} 
                            style={{border: '2px solid black', borderRadius: '5px'}}>
                                <span>Rating: {review.rating}</span>
                                <p>{review.text}</p>
                            </div>
                        )
                    })}
                </ul>
            </div>
        )
    }

}

// const mapStateToProps = (state, {reviews}) => (state, {reviews})

export default connect()(Reviews)
