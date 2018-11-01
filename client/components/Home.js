import React from 'react'

class Home extends React.Component {
	render() {
		const { user } = this.props

		return (
			<div>
				{user.id ? <h4>Welcome {user.firstName}!</h4> : <h4>Welcome!</h4>}
			</div>
		)
	}
}

export default Home