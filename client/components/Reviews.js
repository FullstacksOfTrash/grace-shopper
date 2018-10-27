import React from 'react'
import { connect } from 'react-redux'

class Reviews extends React.Component{

    render(){
        const { productReviews } = this.props
        if (!productReviews.length) {
            return <div>There's no reviews for this product. Be the first one to write one!</div>
        }
        return (
            <div>
                <h4>Reviews</h4>
                <ul>
                    {productReviews.map(review => {
                        return (
                            <div key={review.id}>
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

export default connect()(Reviews)