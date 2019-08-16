import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { signUp } from '../../actions/authActions';

import CircularProgress from '../ui/CircularProgress';

class SignUp extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    error: {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    }
  };

  componentDidMount() {
    window.scrollTo(undefined, 0);
  }

  onEmailInput = (e) => {
    const val = e.target.value.trim();
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (val === '') {
      this.setState({ error: { ...this.state.error, email: 'Email is required' } });
    } else if (!regex.test(val)) {
      this.setState({ error: { ...this.state.error, email: 'Email is invalid' } });
    } else {
      this.setState({ 
        email: val, 
        error: { ...this.state.error, email: '' }
      });
    }
  };

  onFirstnameInput = (e) => {
    const val = e.target.value.trim();
    const regex = /[a-zA-Z]{2,}/;

    if (val === '') {
      this.setState({ error: { ...this.state.error, firstname: 'First name is required' } });
    } else if (!regex.test(val)) {
      this.setState({ error: { ...this.state.error, firstname: 'First name must be at least 2 letters' } });
    } else {
      this.setState({ 
        firstname: val, 
        error: { ...this.state.error, firstname: '' }
      });
    }
  };

  onLastNameInput = (e) => {
    const val = e.target.value.trim();
    const regex = /[a-zA-Z]/g;

    if (val === '') {
      this.setState({ error: { ...this.state.error, lastname: 'Last name is required' } });
    } else if (!regex.test(val)) {
      this.setState({ error: { ...this.state.error, lastname: 'Last name should only contain letters' } });
    } else {
      this.setState({ 
        lastname: val, 
        error: { ...this.state.error, lastname: '' }
      });
    }
  };

  onPasswordInput = (e) => {
    const val = e.target.value.trim();
    const regex = /[A-Z\W]/;

    if (val === '') {
      this.setState({ error: { ...this.state.error, password: 'Password is required' } });
    } else if (val.length < 8) {
      this.setState({ error: { ...this.state.error, password: 'Password should be 8 characters long' } });
    } else if (!regex.test(val)) {
      this.setState({ error: { ...this.state.error, password: 'Password should contain uppercase or alphanumeric character' } });
    } else {
      this.setState({ 
        password: val, 
        error: { ...this.state.error, password: '' }
      });
    }
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password, error } = this.state;
    const isError = Object.keys(error).some(field => error[field] !== '') 
      || Object.keys(this.state).some(field => this.state[field] === '');

    if (!isError) {
      this.props.dispatchSignUp({
        firstname,
        lastname,
        email,
        password
      });
    } 
  } 

  errorClassName = (field) => {
    return this.state.error[field] ? 'input-error' : '';
  }

  render() {
    const { error } = this.state;
    const { isAuthenticating, status } = this.props;

    return (
      <div className="signup">
        {status && <strong><span className="input-message text-center padding-s">{status}</span></strong>}
        <div className="signup-wrapper">
          <h3>Sign up to Salinaka</h3>
          <form onSubmit={this.onFormSubmit}>
            <div className="signup-field">
              {error.firstname && <span className="input-message">{error.firstname}</span>}
              <span className="d-block padding-s">First Name</span>
              <input 
                  className={`input-form d-block ${this.errorClassName('firstname')}`}
                  onKeyUp={this.onFirstnameInput}
                  placeholder="First Name"
                  readOnly={isAuthenticating}
                  style={{ textTransform: 'capitalize' }}
                  type="text" 
              />
            </div>
            <div className="signup-field">
              {error.lastname && <span className="input-message">{error.lastname}</span>}
              <span className="d-block padding-s">Last Name</span>
              <input
                  className={`input-form d-block ${this.errorClassName('lastname')}`}
                  onInput={this.onLastNameInput}
                  placeholder="Last Name" 
                  readOnly={isAuthenticating}
                  style={{ textTransform: 'capitalize' }}
                  type="text"
              />
            </div>
            <div className="signup-field">
              {error.email && <span className="input-message">{error.email}</span>}
              <span className="d-block padding-s">Email</span>
              <input 
                  className={`input-form d-block ${this.errorClassName('email')}`}
                  onInput={this.onEmailInput}
                  placeholder="Your Email"
                  readOnly={isAuthenticating}
                  type="email" 
              />
            </div>
            <div className="signup-field">
              {error.password && <span className="input-message">{error.password}</span>}
              <span className="d-block padding-s">Password</span>
              <input
                  className={`input-form d-block ${this.errorClassName('password')}`}
                  onInput={this.onPasswordInput}
                  placeholder="Password" 
                  readOnly={isAuthenticating}
                  type="password"
              />
            </div>
            <br/>
            <div className="signup-field signup-action">
              <button
                  className="button"
                  disabled={isAuthenticating}
              >
                <CircularProgress visible={isAuthenticating} theme="light" />
                {isAuthenticating ? 'Signing Up' : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, app }) => ({
  isAuthenticating: app.isAuthenticating,
  status: auth.authStatus
});

const mapDispatchToProps = dispatch => ({
  dispatchSignUp: user => dispatch(signUp(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
