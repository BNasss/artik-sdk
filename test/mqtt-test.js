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
var mqtt = {};
var akc_device_id = process.env.MQTT_DEVICE_ID;
var akc_device_token = process.env.MQTT_DEVICE_TOKEN;
var host = 'api.artik.cloud';
var port = 8883;


var akc_msg          = '{ "state": true }';  // Change for a message supported by
                                    //  the device's manifest
var ca_cert          = '/etc/ssl/certs/ca-bundle.crt';

/* Test Case Module */
testCase('MQTT', function() {


    pre(function() {
    });

    testCase('#on(started)', function() {

        assertions('Return callback event when the mqtt module is started', function(done) {
	    try {
		mqtt = new(require('../src/mqtt.js'))('artik_mqtt_client',
						      akc_device_id,
						      akc_device_token,
						      false,
						      0,
						      true);
		mqtt.on('started', function() {
                    console.log('on start');
                    done();
		});
	    } catch (err) {
		console.log("[Exception] : " + err.message);
	    }
        });
    });

    testCase('#connect()', function() {

        assertions('Return callback event when the mqtt client is connected', function(done) {

            mqtt.on('connected', function(result) {
                console.log('on connected: ' + result);
                assert.equal(result, "OK");
                done();
            });
            mqtt.tls_set(ca_cert);
            mqtt.connect(host, port);
        });

    });

    testCase('#subscribe(), on(subscribed)', function() {

        assertions('Return callback event when the mqtt client subscribes to a topic', function(done) {

            mqtt.on('subscribed', function(mid) {
                console.log('on subscribed: ' + mid);
                assert.isNotNull(mid);
		done();
            });

            /* Subscribe to receive actions ¨*/
            mqtt.subscribe(0, '/v1.1/actions/' + akc_device_id);
        });

    });

    testCase('#publish(), on(published), on(received)', function(done) {

        assertions('Return callback event when the mqtt client receives a message', function(done) {

            mqtt.on('published', function(mid) {
                console.log('on published: ' + mid);
                assert.isNotNull(mid);
            });

            mqtt.on('received', function(mid, topic, buffer, qos, retain) {
                console.log('Received message');
                console.log('\tmid: ' + mid);
                console.log('\tqos: ' + qos);
                console.log('\tretain: ' + retain);
                console.log('\ttopic: ' + topic);
                console.log('\tdata: ' + buffer);
                assert.isNotNull(mid);
		done();
            });

            /* Publish a message */
            mqtt.publish(0, false, '/v1.1/messages/' + akc_device_id, new Buffer(akc_msg));
        });


    });

    testCase('#unsubscribe(), on(unsubscribed)', function() {

        assertions('Return callback event when the mqtt client unsubscribes to a topic', function(done) {

            mqtt.on('unsubscribed', function(mid) {
                console.log('on unsubscribed: ' + mid);
                assert.isNotNull(mid);
                done();
            });

            /* Subscribe to receive actions ¨*/
            mqtt.unsubscribe('/v1.1/actions/' + akc_device_id);
        });

    });

    testCase('#disconnect(), on(disconnected)', function() {

        assertions('Return callback event when the mqtt client disconnects from the broker', function() {

            mqtt.on('disconnected', function(result) {
                console.log('on disconnected: ' + result);
                assert.equal(result, "OK");
            });

            /* Subscribe to receive actions ¨*/
            mqtt.disconnect();
        });

    });

    post(function() {
    });

});
