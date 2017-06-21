
import { AppFlowActions } from '../constants';

function loading(state = {}, action) {
	switch (action.type) {
		case AppFlowActions.SENDING_REQUEST:
			return action.sending
		default:
			return state;
	}
}

export default loading;
