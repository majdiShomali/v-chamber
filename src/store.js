import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import fetchItemsReducer from './actions/GetItems'
import fetchFavItemsReducer from './actions/FavoriteItems'
import fetchItemsCartReducer from './actions/GetItemsCart'
const store = configureStore({
  reducer: {
     fetchItems:fetchItemsReducer,
     FavoriteItems:fetchFavItemsReducer,
     fetchItemsCart:fetchItemsCartReducer,
  },
  middleware: [thunkMiddleware],
});
export default store;
