import { combineReducers } from 'redux';
import getItems_reducer from './getItems_reducer';
import error_reducer from './error_reducer';
import page_reducer from './page_reducer';
import user_reducer from './user_reducer';
import authentication_reducer from './authentication_reducer';


const allRudecesrs = combineReducers({
  allArticles: getItems_reducer,
  page: page_reducer,
  error_reducer,
  user: user_reducer,
  authentication: authentication_reducer,
});

export default allRudecesrs;
