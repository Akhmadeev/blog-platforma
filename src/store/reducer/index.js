import { combineReducers } from 'redux';
import getItems_reducer from './getItems_reducer';
import getItem_reducer from './getItem_reducer';
import error_reducer from './error_reducer';
import page_reducer from './page_reducer';
import user_reducer from './user_reducer';

const allRudecesrs = combineReducers({
  getItem: getItems_reducer,
  getPage: page_reducer,
  item: getItem_reducer,
  error_reducer,
  user: user_reducer
});

export default allRudecesrs;
