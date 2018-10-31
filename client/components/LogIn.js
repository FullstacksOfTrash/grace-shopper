import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logIn } from '../store/thunks';

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
    loggingIn(this.state, history);
  }
  render() {
    const { email, password } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <button type="submit">Log in</button>
        </form>
        <Link to="/signup">Sign Up!</Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loggingIn: (credentials, history) => dispatch(logIn(credentials, history)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LogIn);
