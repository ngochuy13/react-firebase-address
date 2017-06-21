
import { AppFlowActions } from '../constants';

function createAddress(state = {}, action) {
	switch (action.type) {
		case AppFlowActions.ADDRESS_CREATE_COMPLETE:
			return {
				status: 'success',
				...action.data
			}
		case AppFlowActions.ADDRESS_CREATE_ERROR:
			return {
				status: 'error',
				...action.data
			}
		default:
			return state;
	}
}

export default createAddress;
