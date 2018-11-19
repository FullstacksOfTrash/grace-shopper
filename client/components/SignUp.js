import React from 'react';
import { connect } from 'react-redux';
import { signUp } from '../store/thunks';
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core'


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


class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
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
    const { signUp, history } = this.props;
    return signUp(this.state, history);
  }
  render() {
    const { handleChange, handleSubmit } = this;
    const { classes } = this.props
    const { firstName, lastName, email, password, address } = this.state;
    // console.log(this.state)
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <TextField
            label='First Name'
            name='firstName'
            type='text'
            value={firstName}
            margin='normal'
            variant='outlined'
            onChange={handleChange}
          />
          <TextField
            label='Last Name'
            className={classes.textField}
            type='text'
            name='lastName'
            value={lastName}
            onChange={handleChange}
            margin='normal'
            variant='outlined'
          />
          <TextField
            id="outlined-email-input"
            label="Email"
            className={classes.textField}
            type="email"
            value={email}
            name="email"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            onChange={handleChange}
        />
         <TextField
            id="outlined-password-input"
            label="Password"
            className={classes.textField}
            type="password"
            name='password'
            value={password}
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            onChange={handleChange}
         />
         <TextField
            label="Address"
            className={classes.textField}
            type="text"
            name='address'
            value={address}
            margin="normal"
            variant="outlined"
            onChange={handleChange}
          />
          <button type="submit">Create account</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: (userInfo, history) => dispatch(signUp(userInfo, history)),
  };
};

export default connect(null,mapDispatchToProps)(withStyles(styles)(SignUp));
