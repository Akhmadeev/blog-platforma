import { ADD_ITEM } from '../type/actionType';

const getItem_reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return action.payload;
    default:
      return state;
  }
};

export default getItem_reducer;
