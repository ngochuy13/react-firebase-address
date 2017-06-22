/* © 2017
 * @author HuyPham
 */

import { AppFlowActions } from '../constants';

/**
 * Tells the app we want to create new budget
 * @param  {object} data          		The data we're sending for create budget
 * @param  {string} data.title 			the title for header
 * @return {void} 						return nothing
 */

export function addressRequest() {
	return { type: AppFlowActions.ADDRESS_REQUEST };
}

export function addressDetailRequest(id) {
	return { type: AppFlowActions.ADDRESS_DETAIL_REQUEST, id };
}

export function addressUpdateRequest(data) {
	return { type: AppFlowActions.ADDRESS_UPDATE_REQUEST, data };
}

export function addressCreateRequest(data) {
	return { type: AppFlowActions.ADDRESS_CREATE_REQUEST, data };
}

export function changeStatusAddress() {
	return { type: AppFlowActions.CHANGE_STATUS_ADDRESS };
}
