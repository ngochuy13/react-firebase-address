/* © 2017
 * @author HuyPham
 */
import { fork } from 'redux-saga/effects';
import {getAddressFlow, getAddressDetailFlow, patchAddressUpdateFlow, postAddressCreateFlow} from './address';
/*
 * rootSaga
 */
export default function* root() {
	// combine your saga here
	yield fork(getAddressFlow);
	yield fork(getAddressDetailFlow);
	yield fork(patchAddressUpdateFlow);
	yield fork(postAddressCreateFlow);
}
