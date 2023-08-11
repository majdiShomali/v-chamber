import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import fetchItemsReducer from './actions/category/GetItems'
import fetchFavItemsReducer from './actions/related/FavoriteItems'
import fetchItemsCartReducer from './actions/related/GetItemsCart'
import fetchOneItemReducer from './actions/category/GetOneItem'
import fetchRelatedItemReducer from './actions/related/GetRelatedItems'
import fetchProviderItemsReducer from './actions/category/GetProviderItems'
import fetchAllRelatedItemsReducer from './actions/related/GetAllRelatedItems'
import fetchOneRelatedItemReducer from './actions/related/GetOneRelatedItem'
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
