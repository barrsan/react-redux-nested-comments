import React, { PropTypes } from 'react';
import SignInForm from '../SignInForm/SignInForm';
import SignOutForm from '../SignOutForm/SignOutForm';

import './Auth.styl';

function Auth(props) {
  return (
    <div className="auth">
      {
        props.username ?
          <SignOutForm username={props.username} signOut={() => props.signOut()} /> :
          <SignInForm signIn={username => props.signIn(username)} />
      }
    </div>
  );
}

Auth.propTypes = {
  username: PropTypes.string.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

Auth.displayName = 'Auth';

export default Auth;
