
import { AppFlowActions } from '../constants';

function listAddress(state = {}, action) {
	switch (action.type) {
		case AppFlowActions.ADDRESS_COMPLETE:
			return {
				status: 'success',
				...action.data
			}
		case AppFlowActions.ADDRESS_ERROR:
			return {
				status: 'error',
				...action.data
			}
		default:
			return state;
	}
}

export default listAddress;
