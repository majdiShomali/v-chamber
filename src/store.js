import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import fetchItemsReducer from './actions/GetItems'
import fetchFavItemsReducer from './actions/FavoriteItems'
import fetchItemsCartReducer from './actions/GetItemsCart'
import fetchOneItemReducer from './actions/GetOneItem'
import fetchProviderItemsReducer from './actions/GetProviderItems'
const store = configureStore({
  reducer: {
     fetchItems:fetchItemsReducer,
     FavoriteItems:fetchFavItemsReducer,
     fetchItemsCart:fetchItemsCartReducer,
     fetchOneItem:fetchOneItemReducer,
     fetchProviderItems:fetchProviderItemsReducer,
  },
  middleware: [thunkMiddleware],
});
export default store;
