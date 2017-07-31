/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The Actions on Google client library.
 * https://developers.google.com/actions/
 */

'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').ApiAiApp;
const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);

// Actions
const DECODE = 'decode';
const ENCODE = 'encode';

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.myaction = functions.https.onRequest((request, response) => {
	const Agent = new App({request, response});
	let actionMap = new Map();
	actionMap.set(DECODE, decode);
	actionMap.set(ENCODE, encode);

	function decode(app) {
		console.log(app.data);
		app.tell('That is a 100 Ohm resistor with a 5 percent tolerance');
	}

	function encode(app) {
		console.log(app.data);
		app.tell('The colors of that resistor are red, blue, and white');
	}
	Agent.handleRequest(actionMap);
});
