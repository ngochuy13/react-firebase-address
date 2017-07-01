import path from 'path';
import express from 'express';
import webpack from 'webpack';
import middleware from './src/middleware';
import bodyParser from 'body-parser';
import compression from 'compression';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());

if(process.env.NODE_ENV === 'development') {
	const config = require('./webpack.config.dev');
	const compiler = webpack(config);
	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath,
		stats: {
			assets: false,
			colors: true,
			version: false,
			hash: false,
			timings: false,
			chunks: false,
			chunkModules: false
		}
	}));
	app.use(require('webpack-hot-middleware')(compiler));
	app.use(express.static(path.resolve(__dirname, 'src')));
} else if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
	app.use(express.static(path.resolve(__dirname, 'dist')));
}

var fs = require('fs');
app.get('/api/v1/categories', function(request, response){
	var data = JSON.parse(fs.readFileSync('./src/data_json/home.json', 'utf8'));
	response.send(data);
});

// firebase
const firebase = require('firebase-admin');
const serviceAccount = require('./react-firebase-address-63c23ca4c3ee.json');
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://react-firebase-address.firebaseio.com'
});
const db = firebase.database();
const addressRef = db.ref("address");
app.get('/api/v1/testfirebase', function(request, response){
	addressRef.once('value').then(function(snapshot) {
		console.log('snapshot', snapshot.val());
		response.send(snapshot.val());
	}, function (errorObject) {
		console.log("The read failed: " + errorObject.code);
	});
	addressRef.child("id_1").set({
        "street": "72 Le Thanh Ton 1",
        "ward": "Ben Nghe",
        "district": "1",
        "city": "Ho Chi Minh",
        "country": "Vietnam"
    });
    addressRef.child("id_2").update({
    	"street": "138 Hai Ba Trung 1"
    });
    addressRef.push().set({
        "street": "72 Le Thanh Ton 2",
        "ward": "Ben Nghe",
        "district": "1",
        "city": "Ho Chi Minh",
        "country": "Vietnam"
    });
});
app.get('/api/v1/address', function(request, response){
	addressRef.once('value').then(function(snapshot) {
		response.send({data: snapshot.val()});
	}, function (errorObject) {
		console.log("The read failed: " + errorObject.code);
		response.send(errorObject);
	});
});
app.get('/api/v1/address/:key', function(request, response){
	if ((request.params || {}).key){
		addressRef.child((request.params || {}).key).once('value').then(function(snapshot) {
			response.send({data: snapshot.val()});
		}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
			response.send(errorObject);
		});
	}
});
app.patch('/api/v1/address/:key', function(request, response){
	if ((request.params || {}).key){
		addressRef.child((request.params || {}).key).update(request.body);
		addressRef.child((request.params || {}).key).once('value').then(function(snapshot) {
			response.send({data: snapshot.val()});
		}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
			response.send(errorObject);
		});
	}
});
app.post('/api/v1/address', function(request, response){
	if (request.body) {
	    addressRef.push().set(request.body);
	    addressRef.once('value').then(function(snapshot) {
			response.send({data: snapshot.val()});
		}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
			response.send(errorObject);
		});
	}
});
// firebase

app.get('*', middleware);

app.listen(process.env.PORT || 8080, '0.0.0.0', (err) => {
	if(err) {
		console.error(err);
	} else {
		console.info('Listening at http://localhost:8080');
	}
});
