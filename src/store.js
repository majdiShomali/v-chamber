import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import fetchItemsReducer from './actions/GetItems'
import fetchFavItemsReducer from './actions/FavoriteItems'
import fetchItemsCartReducer from './actions/GetItemsCart'
import fetchOneItemReducer from './actions/GetOneItem'
import fetchRelatedItemReducer from './actions/GetRelatedItems'
import fetchProviderItemsReducer from './actions/GetProviderItems'
import fetchAllRelatedItemsReducer from './actions/GetAllRelatedItems'
import fetchOneRelatedItemReducer from './actions/GetOneRelatedItem'
const store = configureStore({
  reducer: {
     fetchItems:fetchItemsReducer,
     FavoriteItems:fetchFavItemsReducer,
     fetchItemsCart:fetchItemsCartReducer,
     fetchOneItem:fetchOneItemReducer,
     fetchProviderItems:fetchProviderItemsReducer,
     fetchRelatedItems:fetchRelatedItemReducer,
     fetchAllRelatedItems:fetchAllRelatedItemsReducer,
     fetchOneRelatedItem:fetchOneRelatedItemReducer,
  },
  middleware: [thunkMiddleware],
});
export default store;
