import { AUTHORIZATION } from '../type/actionType';

const authentication_reducer = (state = false, action) => {
  switch (action.type) {
    case AUTHORIZATION:
      return action.payload;
    default:
      return state;
  }
};

export default authentication_reducer;
