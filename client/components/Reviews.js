import React from 'react'
import { connect } from 'react-redux'
import SingleReview from './SingleReview'

import { withStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'

const styles = theme => ({
  // root: {
  //   ...theme.mixins.gutters(),
  //   paddingTop: theme.spacing.unit * 2,
  //   paddingBottom: theme.spacing.unit * 2,
  // },
  paper: {
    padding: 50,
    marginTop: 10,
    marginBottom: 10
  },
});

class Reviews extends React.Component {

  componentDidUpdate(prevProps) {
    if (this.props.reviews !== prevProps.reviews) {
      this.setState({ reviews: this.props.reviews })
    }
  }

  render() {
    const { reviews } = this.props
    const { classes } = this.props
    return (
      !reviews.length
        ? <div />
        : <div>
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

export default connect(mapStateToProps)(withStyles(styles)(Reviews))
