/* © 2017 
 * @author HuyPham
 */
import thunk from 'redux-thunk';
import { applyMiddleware, createStore/*, compose, combineReducers*/ } from 'redux';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
// import { routerMiddleware, routerReducer } from 'react-router-redux';

import rootReducers from '../reducers';
import rootSagas from '../sagas';

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = applyMiddleware(
	thunk,
	sagaMiddleware,
	logger
)(createStore);
// ==============================================
const configureStore = (initialState) => {
	const store = {
		...createStoreWithMiddleware(rootReducers, initialState),
		runSaga: sagaMiddleware.run(rootSagas)
	};
	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers');
			store.replaceReducer(nextRootReducer);
		});
	}
	return store;
	// return {
	// 	...createStore(rootReducers,
    //   window.devToolsExtension ? window.devToolsExtension() : f => f,
	// 		process.env.NODE_ENV === 'production'
	// 			? applyMiddleware(thunk, sagaMiddleware)
	// 			: applyMiddleware(thunk, sagaMiddleware, logger)
	// 	),
	// 	runSaga: sagaMiddleware.run(rootSagas)
	// };
};

// ==============================================
// const reducer = combineReducers({ ...reducers, routing: routerReducer });
// const browserHistory = {};

/* istanbul ignore next */
// const newStore = (initialState = {}) => {
//   const createStoreWithMiddleware = applyMiddleware(thunk, sagaMiddleware, logger )(createStore);
//   const store = createStoreWithMiddleware(reducer, initialState);
//   sagaMiddleware.run(rootSagas);

//   return store;
// };
// export default newStore;
// ==============================================
// const configureStore = () => {
// 	return createStore(reducers,
// 		window.devToolsExtension ? window.devToolsExtension() : f => f,
// 		process.env.NODE_ENV === 'production'
// 			? applyMiddleware(thunk)
// 			: applyMiddleware(thunk, logger)
// 	);
// };

export default configureStore;
