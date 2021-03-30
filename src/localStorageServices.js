export const getToken = () => {
    if (localStorage.getItem('token')) return localStorage.getItem('token');
    return null
};
export const setToken = (token) => {
    if (localStorage.setItem('token', token)) return true
    return false
};
export const removeToken = () => localStorage.removeItem('token');