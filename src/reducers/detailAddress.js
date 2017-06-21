
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
		default:
			return state;
	}
}

export default detailAddress;
