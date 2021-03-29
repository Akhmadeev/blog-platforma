import { ADD_ITEMS } from '../type/actionType';

const getItems_reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ITEMS:
      return action.payload;
    default:
      return state;
  }
};

export default getItems_reducer;
