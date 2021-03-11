const user_reducer = (state = {}, action) => {
    switch (action.type) {
      case 'GET_USER':
        return [action.user];
      case 'DELETE_USER':
        return {};
      default:
        return state;
    };
};

export default user_reducer;