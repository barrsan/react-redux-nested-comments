import React, { Component, PropTypes } from 'react';
import './SignInForm.styl';

export default class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    if (this.refs.user.value) this.signIn();
  }

  signIn() {
    const inputUser = this.refs.user.value;
    if (inputUser !== '') {
      this.props.signIn(inputUser);
      this.refs.user.value = '';
    }
  }

  render() {
    return (
      <form
        className="signInForm"
        onSubmit={this.onFormSubmit}
      >
        <input
          className="signInForm__input"
          placeholder="Username"
          ref="user"
        />
        <button className="signInForm__btn" type="submit">Sign in</button>
      </form>
    );
  }
}

SignInForm.propTypes = {
  signIn: PropTypes.func.isRequired,
};

SignInForm.displayName = 'SignInForm';
