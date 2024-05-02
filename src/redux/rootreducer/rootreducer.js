// rootReducer.js
import { combineReducers } from 'redux';


import productReducer from '../Productreducer';
import saleReducer from '../sale';
import itemReducer from '../itemaction';

const rootReducer = combineReducers({
  sales: saleReducer,
  item: itemReducer,
  products:productReducer,
});

export default rootReducer;
