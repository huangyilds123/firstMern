import { combineReducers } from 'redux';
import itemReducer from './shoppingItems';


export default combineReducers({
    item: itemReducer
})