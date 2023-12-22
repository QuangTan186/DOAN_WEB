/**
 * import libraries
 */
import { combineReducers } from 'redux';
import loginReducer from './login/reducer';
import CategoryReducer from './category/reducer';
import ProductReducer from './product/reducer';
import CartReducer from './cart/reducer';
import AddressReducer from './address/reducer';
import OrderReducer from './order/reducer';

/**
 * Combinie all reducers on app
 * -----------------------------------------
 * @access : public
 */
const rootReducer = combineReducers({
    Login: loginReducer,
    Category: CategoryReducer,
    Product: ProductReducer,
    Cart: CartReducer,
    Address: AddressReducer,
    Order: OrderReducer,
});

export default rootReducer;
