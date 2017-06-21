/* © 2017
 * @author Huy Pham
 */
import { take, call, put } from 'redux-saga/effects';
import { AppFlowActions } from '../constants';
import { fetchClient_v2 as fetch } from '../helpers/fetch.client';
import appConfig from '../config';

function* getAddress () {
	yield put({ type: AppFlowActions.SENDING_REQUEST, sending: true });
	try {
		const url = appConfig.ADDRESS_URL;
		const myRequest = new Request(url, {});
		let address = yield call(fetch, myRequest);
		if (address) {
			yield put({ type: AppFlowActions.ADDRESS_COMPLETE, data: address });
		} else {
			yield put({ type: AppFlowActions.ADDRESS_ERROR, data: address });
		}
	} catch (error) {
		console.log('getAddressFlow', error);
	}
	yield put({ type: AppFlowActions.SENDING_REQUEST, sending: false });
}
export function* getAddressFlow() {
	const INFINITE = true;
	while (INFINITE) {
		const request = yield take(AppFlowActions.ADDRESS_REQUEST);
		yield call(getAddress);
	}
}
