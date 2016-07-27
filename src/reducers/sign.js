import { SIGN_IN, SIGN_OUT } from '../constants/constants';

const INITIAL_STATE = {
  username: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, username: action.payload };
    case SIGN_OUT:
      return { ...state, username: '' };
    default:
      return state;
  }
}
