// import { createReducer, createAction } from '@reduxjs/toolkit';
// import { ADD_ITEMS, AUTHORIZATION, DELETE_USER, EDIT_PAGE, ERROR, GET_USER } from '../store/type/actionType';

// const initialState = {
//   page: 1,
//   allArticles: [],
//   error_reducer: false,
//   user: {},
//   authentication: false,
// };

// const error = createAction(ERROR);

// const add_items = createAction(ADD_ITEMS, payload);

// const edit_page = createAction(EDIT_PAGE, page);
// const get_user = createAction(GET_USER, user);
// const delete_user = createAction(DELETE_USER);
// const authentication_user = createAction(AUTHORIZATION, payload);

// export default createReducer(initialState, {
//   [error]: function (state) {
//     state.error_reducer = true;
//   },
//   [add_items]: function (state, action) {
//     state.allArticles.push(action.payload);
//   },
//   // [delete_item]: function (state, payload) {
//   //     state.allArticles
//   // }
//   [edit_page]: function (state, action) {
//     state.page = action.page;
//   },
//   [get_user]: function (state, action) {
//     state.user = action.user;
//   },
//   [delete_user]: function (state) {
//     state.user = {};
//   },
//   [authentication_user]: function (state, action) {
//     state.authentication = action.payload;
//   },
// });
