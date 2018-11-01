import React from 'react'
import { connect } from 'react-redux';
import { editReview } from '../store/thunks'
import { getProduct, getReview } from '../store/utils'

class UpdateReview extends React.Component {
	constructor({ review, userId }) {
		super({ review, userId })
		this.state = {
			rating: review ? review.rating : 0,
			text: review ? review.text : '',
			userId: userId ? userId : 0
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value })
	}

	handleSubmit(event) {
		event.preventDefault()
		const { onEdit, review } = this.props
		onEdit(parseInt(review.id), this.state)
	}

	render() {

		const { handleChange, handleSubmit } = this
		const { rating, text } = this.state
		return (
			<div>
				<hr />
				<h4>Update your review for this product</h4>
				<form onSubmit={handleSubmit}>
					<label htmlFor='rating'>Rating:</label>{' '}
					<input name='rating' onChange={handleChange} value={rating}></input>{' '}
					<label htmlFor='text'>Tell us about this product:</label>{' '}
					<input name='text' onChange={handleChange} value={text}></input>{' '}
					<button type='submit'>Update</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = ({ auth, products, reviews }, { reviewId, productId }) => ({
	userId: auth.user.id,
	user: auth.user,
	productId,
	product: getProduct(productId, products),
	review: getReview(reviewId, reviews)
})


const mapDispatchToProps = (dispatch) => ({
	onEdit: (id, rvw) => dispatch(editReview(id, rvw))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateReview)