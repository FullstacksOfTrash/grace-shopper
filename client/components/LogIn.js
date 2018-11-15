import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logIn } from '../store/thunks';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: 'moe@moe.com',
      password: 'MOE',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { history, loggingIn } = this.props;
    console.log( loggingIn )
    console.log( this.state )
    loggingIn(this.state, history);
  }
  render() {
    const { email, password } = this.state;
    const { handleChange, handleSubmit } = this;
    const { classes } = this.props;
    console.log(this.state)
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <TextField
          id="outlined-email-input"
          label="Email"
          className={classes.textField}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
          value={email}
          onChange={handleChange}
        />
          <TextField
          id="outlined-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          name='password'
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          value={password}
          onChange={handleChange}
        />  
          <div></div>
           <Button variant="contained" color="primary" type="submit" >Log in</Button>
            {' '}{' '}{' '}
           <Link to="/signup"><Button variant="contained" color="primary">Sign Up!</Button></Link>
        </form>
      </div>
    );
  }
}

LogIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loggingIn: (credentials, history) => dispatch(logIn(credentials, history)),
  };
};

export default connect(null,mapDispatchToProps)(withStyles(styles)(LogIn));
