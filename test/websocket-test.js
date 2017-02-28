/* Global Includes */
var testCase   = require('mocha').describe;
var pre        = require('mocha').before;
var preEach    = require('mocha').beforeEach;
var post       = require('mocha').after;
var postEach   = require('mocha').afterEach;
var assertions = require('mocha').it;
var assert     = require('chai').assert;
var validator  = require('validator');
var exec       = require('child_process').execSync;
var artik      = require('../lib/artik-sdk');


/* Test Specific Includes */
var websocket         = require('../src/websocket');
var host              = "echo.websocket.org";
var uri               = "/";
var port              = 80;
var ssl_connection    = 0;
var use_se            = process.env.WEBSOCKET_ENABLE_SDR == 1 ? true : false;
var test_message      = "ping";


var conn = new websocket(host, uri, port, ssl_connection, use_se);

/* Test Case Module */
testCase('Websockets', function() {

	this.timeout(10000);

	pre(function() {

		conn = new websocket(host, uri, port, ssl_connection, use_se);

	});

	testCase('#open_stream(), on(connected)', function() {

		assertions('Return callback event when the websocket is connected', function(done) {

			conn.on('connected', function(result) {
				console.log("Connect result: " + result);
				assert.equal(result, "CONNECTED");
				done();
			});

			conn.open_stream();
		});

	});


	testCase('#write_stream(), on(receive) with echo', function () {

		assertions('Return callback event when the echo is received', function(done) {

			conn.on('receive', function(message) {
				console.log("received: " + message);
				assert.isNotNull(message);
				assert.equal(message, "ping");
				done();
			});

			console.log("sending: " + test_message);
			conn.write_stream(test_message);
		});

	});

	post(function() {
	});

});
