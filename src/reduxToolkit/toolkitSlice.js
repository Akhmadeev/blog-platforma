import { createSlice } from '@reduxjs/toolkit';

/* eslint no-param-reassign: "error" */

const toolkitSlice = createSlice({
  name: 'toolkit',
  initialState: {
    page: 1,
    allArticles: [],
    error_reducer: false,
    user: {},
    authentication: false,
  },
  reducers: {
    error(state) {
      state.error_reducer = true;
    },
    add_items(state, action) {
      state.allArticles.push(action.payload);
    },
    edit_page(state, page) {
      state.page = page;
    },
    get_user(state, action) {
      state.user = action.payload;
    },
    delete_user(state) {
      state.user = {};
    },
    authentication_user(state, action) {
      state.authentication = action.payload;
    },
  },
});

export default toolkitSlice.reducer;
export const { error, add_items, edit_page, get_user, delete_user, authentication_user } = toolkitSlice.actions;
