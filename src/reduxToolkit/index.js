import { combineReducers, configureStore } from '@reduxjs/toolkit';
import toolkitSlice from './toolkitSlice';

export const rootReducer = combineReducers({
  toolkit: toolkitSlice,
});

/* eslint import/prefer-default-export: "error" */

export const store = configureStore({
  reducer: rootReducer,
});
