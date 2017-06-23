const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');

var env = {
	NODE_ENV: 'production',
	WEBPACK: false,
	HOST: 'http://localhost:5000'
};

module.exports = {
	entry: {
		bundle: path.resolve(__dirname, 'src'),
		vendor: [
			'babel-polyfill',
			'react',
			'react-router',
			'redux',
			'react-dom',
			'lodash'
		]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].[chunkhash].js',
		publicPath: '/'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(env)
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, 'src', 'assets'),
				to: path.resolve(__dirname, 'dist', 'assets')
			}
		]),
		new ExtractTextPlugin('css/bundle.[chunkhash].css'),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filname: '[name].[chunkhash].js'
		}),
		new AssetsPlugin({ path: path.join(__dirname, 'dist') })
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				include: path.resolve(__dirname, 'src')
			},
			{
				test: /\.scss/,
				loader: ExtractTextPlugin.extract('style', 'css!sass!postcss'),
				include: path.resolve(__dirname, 'src')
			},
			{
				test: /\.css/,
				loader: 'style!css-loader?url=false!postcss'
			},
			{
				test: /\.json$/,
				loader: 'json-loader',
			},
			{
		        test: /\.svg$/,
		        loader: 'svg-inline-loader?classPrefix'
		    },
		    {
		    	test: /\.(png|woff|woff2|eot|ttf|svg)$/,
		    	loader: 'url-loader?limit=100000'
		    }
		]
	},
    postcss: function() {
        return [autoprefixer];
    }
};
