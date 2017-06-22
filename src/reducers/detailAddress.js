
import { AppFlowActions } from '../constants';

function detailAddress(state = {}, action) {
	switch (action.type) {
		case AppFlowActions.ADDRESS_DETAIL_COMPLETE:
			return {
				status: 'success',
				...action.data
			}
		case AppFlowActions.ADDRESS_DETAIL_ERROR:
			return {
				status: 'error',
				...action.data
			}
		case AppFlowActions.CHANGE_STATUS_ADDRESS:
			return {
			}
		default:
			return state;
	}
}

export default detailAddress;
