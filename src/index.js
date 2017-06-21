require("babel-polyfill");
if (!window.Intl) {
	require("intl");
}

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createHistory } from 'history';
import { Router, browserHistory, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import reducers from './reducers';
import createRoutes from './routes';
import configureStore from './store';

var store = configureStore();

let rootElement = document.getElementById('app');
function renderRoot() {
	render(
			<Provider store={store}>
				{ createRoutes(browserHistory, store) }
			</Provider>,
		rootElement);
}
renderRoot();

if ( window ) {
	window.dispatchStore = store.dispatch;
}
