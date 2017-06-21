
import { AppFlowActions } from '../constants';

function updateAddress(state = {}, action) {
	switch (action.type) {
		case AppFlowActions.ADDRESS_UPDATE_COMPLETE:
			return {
				status: 'success',
				...action.data
			}
		case AppFlowActions.ADDRESS_UPDATE_ERROR:
			return {
				status: 'error',
				...action.data
			}
		default:
			return state;
	}
}

export default updateAddress;
