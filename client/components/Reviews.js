import React from 'react'
import { connect } from 'react-redux'
import SingleReview from './SingleReview'

class Reviews extends React.Component {

    componentDidUpdate(prevProps) {
        if (this.props.reviews !== prevProps.reviews) {
            this.setState({ reviews: this.props.reviews })
        }
    }

    render() {
        const { reviews } = this.props

        return (
            !reviews.length ?
                <div>There are no reviews for this product. Be the first to write one!</div>
                :
                <div>
                    <h4>Reviews</h4>
                    <ul>
                        {
                            reviews.map(review => (
                                <SingleReview key={review.id} reviewId={review.id} />
                            ))
                        }
                    </ul>
                </div>
        )
    }
}

const mapStateToProps = ({ reviews, auth }) => ({
    reviews,
    user: auth.user
})

export default connect(mapStateToProps)(Reviews)
