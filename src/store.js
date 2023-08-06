import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import fetchItemsReducer from './actions/GetItems'

const store = configureStore({
  reducer: {
     fetchItems:fetchItemsReducer,

  },
  middleware: [thunkMiddleware],
});
export default store;
