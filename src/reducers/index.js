import { combineReducers } from 'redux';
import sign from './sign';
import comments from './comments';

export default combineReducers({
  sign,
  comments,
});
