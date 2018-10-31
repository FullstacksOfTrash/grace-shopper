import React from 'react'
import { connect } from 'react-redux'
import { deleteReview, editReview } from '../store/thunks'
import UpdateReview from './UpdateReview';

class Reviews extends React.Component {

    componentDidUpdate(prevProps) {
        if (this.props.reviews !== prevProps.reviews) {
            this.setState({ reviews: this.props.reviews })
        }
    }

    render() {
        const { reviews, onDelete, user } = this.props

        return (
            !reviews.length ?
                <div>There are no reviews for this product. Be the first to write one!</div>
                :
                <div>
                    <h4>Reviews</h4>
                    <ul>
                        {reviews.map(review => {
                            return (
                                <div key={review.id}
                                    style={{ border: '2px solid black', borderRadius: '5px' }}>
                                    <span>Rating: {review.rating}</span>
                                    <p>{review.text}</p>
                                    {' '}
                                    <button onClick={() => onDelete(review.productId, review.id)}>Delete Review</button>
                                    {
                                        user.id === review.userId || user.admin === true ?
                                            <UpdateReview reviewId={review.id} productId={review.productId} />
                                            :
                                            null
                                    }
                                </div>
                            )
                        })}
                    </ul>
                </div>
        )
    }
}

const mapStateToProps = ({ reviews, auth }) => ({
    reviews,
    user: auth.user
})

const mapDispatchToProps = (dispatch) => ({
    onDelete: (productId, reviewId) => dispatch(deleteReview(productId, reviewId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)
