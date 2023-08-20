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
import fetchJuiceTypeByCategoryReducer from './actions/juice/GetJuiceTypeByCategory'
import fetchJuiceSizeByCategoryReducer from './actions/juice/GetJuiceSizeByCategory'
import fetchJuiceNikotinByCategoryReducer from './actions/juice/GetJuiceNikotinByCategory'
import fetchJuiceFlavorByCategoryReducer from './actions/juice/GetJuiceFlavorByCategory'
import fetchJuiceSizeReducer from './actions/juice/GetJuiceSize'
import fetchJuiceTypeReducer from './actions/juice/GetJuiceType'
import fetchJuiceNikotinReducer from './actions/juice/GetJuiceNikotin'
import fetchAllOrdersReducer from './actions/orders/GetAllOrders'
import fetchOnWayOrdersReducer from './actions/orders/GetOnWayOrders'
import fetchDeliverdOrdersReducer from './actions/orders/GetDeliverdOrders'
import fetchUserOrdersReducer from './actions/orders/GetUserOrders'
import fetchOrderReducer from './actions/orders/GetOrder'

import fetchUserOrdersPendingReducer from "./actions/orders/userOrders/GetUserOrdersPending"
import fetchUserOrdersStartedReducer from "./actions/orders/userOrders/GetUserOrdersStarted"
import fetchUserOrdersDoneReducer from "./actions/orders/userOrders/GetUserOrdersDone"

import fetchProductStikersReducer from "./actions/stickers/GetProductStickers"

import fetchPriceReducer from "./actions/calculatePrice/GetPrice"
const store = configureStore({
  reducer: {
     fetchPrice:fetchPriceReducer,

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
     fetchJuiceTypeByCategory:fetchJuiceTypeByCategoryReducer,
     fetchJuiceSizeByCategory:fetchJuiceSizeByCategoryReducer,
     fetchJuiceNikotinByCategory:fetchJuiceNikotinByCategoryReducer,
     fetchJuiceFlavorByCategory:fetchJuiceFlavorByCategoryReducer,

     fetchJuiceSize:fetchJuiceSizeReducer,
     fetchJuiceNikotin:fetchJuiceNikotinReducer,
     fetchAllOrders:fetchAllOrdersReducer,
     fetchOnWayOrders:fetchOnWayOrdersReducer,
     fetchDeliverdOrders:fetchDeliverdOrdersReducer,
     fetchUserOrders:fetchUserOrdersReducer,
     fetchOrder:fetchOrderReducer,


     fetchJuiceType:fetchJuiceTypeReducer,


     fetchUserOrdersPending:fetchUserOrdersPendingReducer,
     fetchUserOrdersStarted:fetchUserOrdersStartedReducer,
     fetchUserOrdersDone:fetchUserOrdersDoneReducer,

     fetchProductStikers:fetchProductStikersReducer,
  },
  middleware: [thunkMiddleware],
});
export default store;
