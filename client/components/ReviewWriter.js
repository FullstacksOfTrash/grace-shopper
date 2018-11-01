import React from 'react'
import { connect } from 'react-redux';
import { createReview } from '../store/thunks'

class ReviewWriter extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			rating: 0,
			text: '',
			userId: props.userId,
			author: props.userName
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		const { saveReview, id, userName } = this.props

		saveReview(id, this.state)
		this.setState({
			rating: 0,
			text: '',
		})
	}

	render() {

		const { handleChange, handleSubmit } = this
		const { rating, text } = this.state
		return (
			<div>
				<hr />
				<h4>Write a review for this product</h4>
				<form onSubmit={handleSubmit}>
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

const mapStateToProps = ({ auth }) => ({
	auth,
	userId: auth.user.id,
	userName: auth.user.firstName + ' ' + auth.user.lastName
})


const mapDispatchToProps = (dispatch) => ({
	saveReview: (id, review) => dispatch(createReview(id, review))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewWriter)