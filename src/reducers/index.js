import { combineReducers } from 'redux';
import { searchReducer } from './searchReducer';
import { userReducer } from './userReducer';
import { cartReducer } from './cartReducer';
import { couponReducer } from './couponReducer';

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  coupon: couponReducer,
});

export default rootReducer;
