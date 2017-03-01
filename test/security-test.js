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
var security = {};
var certificate = "";

/* Test Case Module */
testCase('Security', function() {
    pre(function(done) {
	this.timeout(10000);
	try {
	    security = artik.security();
	    done();
	} catch (err) {
	    console.log("[Exception] : " + err.message);
	}
    });

    testCase('#get_certificate()', function() {

	assertions('Get the certificate from the Secure Element.', function() {
	    try {
		certificate = security.get_certificate();
		assert.isString(certificate, "Invalid return type of the variable : 'Certificate'.\n");
		console.log("Certificate : ");
		console.log(certificate);
	    } catch (err) {
		console.log("[Exception] : " + err.message);
	    }
	});
    });
    testCase('#get_key_from_cert()', function() {

	assertions('Get "key" of the certificate.', function() {
	    try {
		var key = security.get_key_from_cert(certificate);
		assert.isString(key, "Invalid return type of the variable : 'Key'.\n");
		console.log("Key of certificate : ");
		console.log(key);
	    } catch (err) {
		console.log("[Exception] : " + err.message);
	    }
	});
    });
    testCase('#get_random_bytes()', function() {
	assertions('Generate random bytes for an array of 32 bytes.', function() {
	    try {
		var random = security.get_random_bytes(32);
		assert.equal(random.length, 32, "Invalid buffer returned due to the invalid size wichi is not equal to 32 for : 'Random'.\n");
		console.log("Bytes : ");
		for (var i = 0; i < random.length; ++i )
		    {
			process.stdout.write(" " + random.readUInt8(i));
		    }
		process.stdout.write("\n");
	    } catch (err) {
		console.log("[Exception] : " + err.message);
	    }
	});
    });
});
