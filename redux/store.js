import { createStore, combineReducers } from 'redux';
import Reducer from './reducer';

const rootReducer = combineReducers({
  auth: Reducer,
});

const store = createStore(rootReducer);

export default store;
