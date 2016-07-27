import React, { Component, PropTypes } from 'react';
import './SignOutForm.styl';


export default class SignOutForm extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.props.signOut();
  }

  render() {
    return (
      <form
        className="signOutForm"
        onSubmit={this.onFormSubmit}
      >
        <span className="signOutForm__label">
          Signed in as <span className="signOutForm__username">{this.props.username}</span>
        </span>
        <button className="signOutForm__btn" type="submit">Sign out</button>
      </form>
    );
  }
}

SignOutForm.propTypes = {
  username: PropTypes.string.isRequired,
  signOut: PropTypes.func.isRequired,
};

SignOutForm.displayName = 'SignOutForm';
