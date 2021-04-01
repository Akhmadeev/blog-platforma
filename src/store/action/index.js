import { DELETE_USER, ADD_ITEMS, DELET_ITEM, EDIT_PAGE, ERROR, GET_USER, AUTHORIZATION } from '../type/actionType';

export const add_items = (payload) => (dispatch) =>
  dispatch({
    type: ADD_ITEMS,
    payload,
  });

export const delet_item = (payload) => (dispatch) =>
  dispatch({
    type: DELET_ITEM,
    payload,
  });

export const edit_page = (page) => ({
  type: EDIT_PAGE,
  page,
});


export const error = () => ({ type: ERROR });

export const get_user = (user) => (dispatch) => dispatch({ type: GET_USER, user });

export const delete_user = () => (dispatch) => dispatch({ type: DELETE_USER });

export const authentication_user = (payload) => (dispatch) => dispatch({ type: AUTHORIZATION, payload });