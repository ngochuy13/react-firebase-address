/* © 2017
 * @author HuyPham
 */
/* global localStorage */
import {forEach, result as _result} from 'lodash';

const defaultHeaders = {
	'Accept': 'application/json, text/plain, */*',
	'Content-Type': 'application/json'
};

export function fetchClient(url, options = {}) {
	let request;
	// console.log(url);
	// console.log(options);

	if (typeof url === 'string') {
		request = new Request(options || {});
		request.url = url;
	} else {
		request = url;
		forEach(defaultHeaders, (value, key) => {
			if (!(options.headers && options.headers[key])) {
				request.headers.set(key, defaultHeaders[key]);
			}
		});
	}

	if (localStorage.fixed_country_code) {
		request.headers.set('Fixed-Country-Code', localStorage.fixed_country_code);
	}

	if (localStorage.language) {
		request.headers.set('Accept-Language', localStorage.language);
	}

	// set token
	if (localStorage.token) {
		request.headers.set('Authorization', localStorage.token_type + ' ' + localStorage.token);
	}

	// console.log(request);
	// console.log(request.headers.get('Content-Type'));
	return fetch(request).then((response) => {
		// console.log('response');
		return response;
	});
}


export function fetchClient_v2(url, options = {}) {
	let request;

	if (typeof url === 'string') {
		request = new Request(options || {});
		request.url = url;
	} else {
		request = url;
		forEach(defaultHeaders, (value, key) => {
			if (!(options.headers && options.headers[key])) {
				request.headers.set(key, defaultHeaders[key]);
			}
		});
	}

	if (localStorage.fixed_country_code) {
		request.headers.set('Fixed-Country-Code', localStorage.fixed_country_code);
	}

	if (localStorage.language) {
		request.headers.set('Accept-Language', localStorage.language);
	}

	// set token
	if (localStorage.token) {
		request.headers.set('Authorization', localStorage.token_type + ' ' + localStorage.token);
	}

	const handleSessionExpired = (status, response) => {
		let expired = status === 401;

		// Check every response if it return 401 error, it will trigger EXPIRE_USER action
		if (expired) {
			auth.clearSession();
			logoutRequest();
		}
		return {
			statusRequest: status,
			timeRequest: new Date(),
			...response
		};
	};

	return fetch(request).then((response) => {
		let json = response.json();
		const status = response.status;
		return json.then(handleSessionExpired.bind(this, status));
	});
}
