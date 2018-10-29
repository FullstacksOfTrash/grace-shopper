import React from 'react'
import { connect } from 'react-redux'
import { deleteReview } from '../store/thunks'

class Reviews extends React.Component{

    render(){
        const { reviews, onDelete, user } = this.props
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
                                <button>Edit Review</button>{' '}
                                {
                                    user.id === review.userId ?
                                    <button onClick={() => onDelete(review.productId, review.id)}>Delete Review</button>
                                    :
                                    <button onClick={() => alert('You do not have permission to delete this review.')}>Delete Review</button>
                                }                          
                            </div>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({ auth }) => ({ user: auth.user })

const mapDispatchToProps = (dispatch) => ({
    onDelete: (productId, reviewId) => dispatch(deleteReview(productId, reviewId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)
