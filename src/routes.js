/* global window*/

import React from 'react';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import { PageNames } from './constants';

import App from './containers/app';
import Home from './containers/home';
import NotFound from './containers/notFound';

let handleChangeUrl = function(state, nextState/*, replace*/) {

	require('smoothscroll-polyfill').polyfill();
	if (typeof window.scroll == 'function') {
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });
	}
};

let requireAuth = function(state, nextState, replace) {
	if (typeof state.getState == 'function') {
		if ( !auth.loggedIn() ){
			var p = nextState.location.pathname;
			p = p.substr(1, p.length);

			replace({
				pathname: '/login',
				query: {
					nextstate: p
				}
			});
		}
	}
};

export default function (history, state) {
	let browserHistory;
	var routing = (
		<Route>
			<IndexRoute component={Home} />
			<Route path={PageNames['404']} component={NotFound} />

		</Route>
	);
	return (
		<Router history={browserHistory || history}>
			<Route path='/' component={App} onChange={handleChangeUrl.bind(this)}>
				{ routing }
				<Route path='*' component={NotFound} />
			</Route>
		</Router>
	);
};
