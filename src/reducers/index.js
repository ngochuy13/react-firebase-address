import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import listAddress from './listAddress';
import detailAddress from './detailAddress';
import createAddress from './createAddress';
import updateAddress from './updateAddress';
import loading from './loading';

export default combineReducers({
	listAddress,
	detailAddress,
	createAddress,
	updateAddress,
	loading,
    routing: routerReducer
});
