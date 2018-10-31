import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteReview } from '../store/thunks'
import UpdateReview from './UpdateReview'
import { getReview } from '../store/utils'

class SingleReview extends Component {

  render() {
    const { onDelete, user, review } = this.props
 
    return (
      <div style={{ border: '2px solid black', borderRadius: '5px' }}>
        <span>Rating: {review.rating}</span>
        <p>{review.text}</p>{' '}
        <button onClick={() => onDelete(review.productId, review.id)}>Delete Review</button>
        {
          user.id === review.userId || user.admin === true ?
            <UpdateReview reviewId={review.id} productId={review.productId} />
            :
            null
        }
      </div>
    )
  }
}

const mapStateToProps = ({auth, reviews}, {reviewId}) => ({
  user: auth.user,
  review: getReview(reviewId, reviews)  
})

const mapDispatchToProps = (dispatch) => ({
  onDelete: (productId, reviewId) => dispatch(deleteReview(productId, reviewId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleReview)