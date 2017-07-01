const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');


var env = {
	NODE_ENV: 'development',
	WEBPACK: true,
	HOST: 'http://localhost:8080'
};

module.exports = {
	entry: {
		bundle: [
			'babel-polyfill',
			'webpack-hot-middleware/client',
			path.resolve(__dirname, 'src')
		]
	},
	output: {
		path: path.resolve(__dirname, 'src'),
		filename: '[name].js',
		publicPath: '/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(env)
		})
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				include: path.resolve(__dirname, 'src'),
				query: {
					presets: [ 'react-hmre' ]
				}
			},
			{
				test: /\.scss/,
				loader: 'style!css-loader?url=false!sass!postcss',
				include: path.resolve(__dirname, 'src')
			},
			{
				test: /\.css/,
				loader: 'style!css-loader?url=false!postcss'
			},
			{
				test: /\.json$/,
				loader: 'json-loader',
			}
		]
	},
    postcss: function() {
        return [autoprefixer];
    }
};
