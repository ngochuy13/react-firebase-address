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

function* getAddressDetail (request) {
	yield put({ type: AppFlowActions.SENDING_REQUEST, sending: true });
	try {
		const url = appConfig.ADDRESS_URL+"/"+request.id;
		const myRequest = new Request(url, {});
		let address = yield call(fetch, myRequest);
		if (address) {
			yield put({ type: AppFlowActions.ADDRESS_DETAIL_COMPLETE, data: address });
		} else {
			yield put({ type: AppFlowActions.ADDRESS_DETAIL_ERROR, data: address });
		}
	} catch (error) {
		console.log('getAddressDetailFlow', error);
	}
	yield put({ type: AppFlowActions.SENDING_REQUEST, sending: false });
}
export function* getAddressDetailFlow() {
	const INFINITE = true;
	while (INFINITE) {
		const request = yield take(AppFlowActions.ADDRESS_DETAIL_REQUEST);
		yield call(getAddressDetail, request);
	}
}

function* patchAddressUpdate (data) {
	yield put({ type: AppFlowActions.SENDING_REQUEST, sending: true });
	try {
		const url = appConfig.ADDRESS_URL+"/"+data.addressKey;
		const myRequest = new Request(url, {
			method: 'PATCH',
			body: JSON.stringify(data)
		});
		let address = yield call(fetch, myRequest);
		if (address) {
			yield put({ type: AppFlowActions.ADDRESS_UPDATE_COMPLETE, data: address });
			yield put({ type: AppFlowActions.ADDRESS_REQUEST });
		} else {
			yield put({ type: AppFlowActions.ADDRESS_UPDATE_ERROR, data: address });
		}
	} catch (error) {
		console.log('getAddressDetailFlow', error);
	}
	yield put({ type: AppFlowActions.SENDING_REQUEST, sending: false });
}
export function* patchAddressUpdateFlow() {
	const INFINITE = true;
	while (INFINITE) {
		const request = yield take(AppFlowActions.ADDRESS_UPDATE_REQUEST);
		yield call(patchAddressUpdate, request.data);
	}
}

function* postAddressCreate (data) {
	yield put({ type: AppFlowActions.SENDING_REQUEST, sending: true });
	try {
		const url = appConfig.ADDRESS_URL;
		const myRequest = new Request(url, {
			method: 'POST',
			body: JSON.stringify(data)
		});
		let address = yield call(fetch, myRequest);
		if (address) {
			yield put({ type: AppFlowActions.ADDRESS_CREATE_COMPLETE, data: address });
			yield put({ type: AppFlowActions.ADDRESS_REQUEST });
		} else {
			yield put({ type: AppFlowActions.ADDRESS_CREATE_ERROR, data: address });
		}
	} catch (error) {
		console.log('getAddressDetailFlow', error);
	}
	yield put({ type: AppFlowActions.SENDING_REQUEST, sending: false });
}
export function* postAddressCreateFlow() {
	const INFINITE = true;
	while (INFINITE) {
		const request = yield take(AppFlowActions.ADDRESS_CREATE_REQUEST);
		yield call(postAddressCreate, request.data);
	}
}
