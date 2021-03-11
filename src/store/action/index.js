export const add_items = (payload) => ({
    type: "ADD_ITEMS", payload
})

export const delet_item = (payload) => ({
  type: 'DELET_ITEM',
  payload,
});

export const edit_page = (page) => ({
  type: 'EDIT_PAGE',
  page,
})
export const add_item = (payload) => ({
  type: 'ADD_ITEM',
  payload,
});
export const error = () => ({ type: "ERROR" })

export const get_user = (user) => ({type: 'GET_USER', user})
export const delete_user = () => ({ type: 'DELETE_USER' });