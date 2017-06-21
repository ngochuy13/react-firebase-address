/* © 2017
 * @author HuyPham
 */
import { fork } from 'redux-saga/effects';
import {getAddressFlow} from './address';
/*
 * rootSaga
 */
export default function* root() {
	// combine your saga here
	yield fork(getAddressFlow);
}
