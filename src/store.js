import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import fetchCategoryItemsReducer from './actions/category/GetCategoryItems'
import fetchFavItemsReducer from './actions/related/FavoriteItems'
import fetchItemsCartReducer from './actions/related/GetItemsCart'
import fetchOneItemReducer from './actions/category/GetOneItem'
import fetchRelatedItemReducer from './actions/related/GetRelatedItems'
import fetchProviderItemsReducer from './actions/category/GetProviderItems'
import fetchAllRelatedItemsReducer from './actions/related/GetAllRelatedItems'
import fetchOneRelatedItemReducer from './actions/related/GetOneRelatedItem'
import fetchCompanyItemsReducer from './actions/company/GetCompanies'
import fetchCompaniesByCategoryReducer from './actions/company/GetCompaniesByCategory'
import fetchJuiceSizeReducer from './actions/juice/GetJuiceSize'
import fetchJuiceTypeReducer from './actions/juice/GetJuiceType'
import fetchJuiceNikotinReducer from './actions/juice/GetJuiceNikotin'
import fetchAllOrdersReducer from './actions/orders/GetAllOrders'
import fetchOnWayOrdersReducer from './actions/orders/GetOnWayOrders'
import fetchDeliverdOrdersReducer from './actions/orders/GetDeliverdOrders'
import fetchUserOrdersReducer from './actions/orders/GetUserOrders'
const store = configureStore({
  reducer: {
     fetchCategories:fetchCategoryItemsReducer,
     FavoriteItems:fetchFavItemsReducer,
     fetchItemsCart:fetchItemsCartReducer,
     fetchOneItem:fetchOneItemReducer,
     fetchProviderItems:fetchProviderItemsReducer,
     fetchRelatedItems:fetchRelatedItemReducer,
     fetchAllRelatedItems:fetchAllRelatedItemsReducer,
     fetchOneRelatedItem:fetchOneRelatedItemReducer,
     fetchCompanyItems:fetchCompanyItemsReducer,
     fetchCompaniesByCategory:fetchCompaniesByCategoryReducer,
     fetchJuiceSize:fetchJuiceSizeReducer,
     fetchJuiceNikotin:fetchJuiceNikotinReducer,
     fetchAllOrders:fetchAllOrdersReducer,
     fetchOnWayOrders:fetchOnWayOrdersReducer,
     fetchDeliverdOrders:fetchDeliverdOrdersReducer,
     fetchUserOrders:fetchUserOrdersReducer,
     fetchJuiceType:fetchJuiceTypeReducer,
  },
  middleware: [thunkMiddleware],
});
export default store;
