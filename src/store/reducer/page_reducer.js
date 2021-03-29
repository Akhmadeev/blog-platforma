import { EDIT_PAGE } from '../type/actionType';

const page_reducer = (state = 1, action) => {
  switch (action.type) {
    case EDIT_PAGE:
      return action.page;
    default:
      return state;
  }
};

export default page_reducer;
