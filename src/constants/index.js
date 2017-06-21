/* © 2017
 * @author HuyPham
 */
import keyMirror from 'fbjs/lib/keyMirror';

/**
 * @namespace Constants
 * @desc App constants
 */

/**
 * @constant {Object} AppFlowActions
 * @memberof Constants
 */
const AppFlowActions = keyMirror({
	// category
	ADDRESS_REQUEST: undefined,
	ADDRESS_COMPLETE: undefined,
	ADDRESS_ERROR: undefined,

	ADDRESS_DETAIL_REQUEST: undefined,
	ADDRESS_DETAIL_COMPLETE: undefined,
	ADDRESS_DETAIL_ERROR: undefined,

	ADDRESS_UPDATE_REQUEST: undefined,
	ADDRESS_UPDATE_COMPLETE: undefined,
	ADDRESS_UPDATE_ERROR: undefined,

	ADDRESS_CREATE_REQUEST: undefined,
	ADDRESS_CREATE_COMPLETE: undefined,
	ADDRESS_CREATE_ERROR: undefined,

	SENDING_REQUEST: undefined,

});

/**
 * @constant {Object} PageNames
 * @memberof Constants
 */
const PageNames = {
	HOME: '/',
	ADDRESS: '/address',
	'404': '/404',
};

export {
	AppFlowActions,
	PageNames
};
