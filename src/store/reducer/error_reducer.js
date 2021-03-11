const error_reducer = (state = false, action) => {
  switch (action.type) {
    case 'ERROR':
      return true
    default:
      return state;
  }
};

export default error_reducer;
