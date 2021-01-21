//combine reducers
import { combineReducers } from 'redux';
import search from './search';
import dataLoading from './dataLoading';
import cart from './cart';
export default combineReducers({
  search: search,
  dataLoading: dataLoading,
  cart: cart,
});
