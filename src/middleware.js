import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import reducers from './reducers';
import createRoutes from './routes';
import appConfig from './config';
import { browserHistory } from 'react-router';

let routes = createRoutes(browserHistory, {}, {});

// config read html
const Mustache  = require('mustache');
const fs = require('fs');
import path from 'path';
function loadHtml() {
	let fileName = 'html/index.development.html';
	if(process.env.NODE_ENV == 'production') {
		fileName = 'html/index.production.html';
	}
  return fs.readFileSync(path.resolve(__dirname, fileName)).toString();
}
export default (req, res) => {
	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if(error) {
			res.status(500).send(error.message);
		} else if(redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if(renderProps) {
			if(process.env.NODE_ENV == 'development') {

				res.status(200).send(
					Mustache.to_html(loadHtml(), {config: {...appConfig, title: 'HuyPham'}})
				);

			} else if(process.env.NODE_ENV == 'production') {
				let assets = require('../dist/webpack-assets.json');
				let scriptSrcs = `<script type='text/javascript' src='${assets.vendor.js}'></script><script type='text/javascript' src='${assets.bundle.js}'></script>`;
				let styleSrc = `<link rel='stylesheet' href='${assets.bundle.css}'>`;
				let renderToStringHTML = renderToString(
					<Provider store={createStore(reducers)}>
							<RouterContext {...renderProps} />
					</Provider>
				);

				res.status(200).send(
					Mustache.to_html(loadHtml(), {config: {...appConfig, title: 'x-hit.io', scriptSrcs: scriptSrcs, styleSrc: styleSrc, renderToStringHTML: renderToStringHTML }})
				);

			}
		} else {
			res.status(404).send('Not found');
		}
	});
};
