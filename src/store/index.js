import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combineReducers from '../reducers';
let store;
export default function configStore() {
  store = createStore(combineReducers, applyMiddleware(thunk));
  return store;
}
