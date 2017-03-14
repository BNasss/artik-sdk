/* Global Includes */
var testCase      = require('mocha').describe;
var pre           = require('mocha').before;
var preEach       = require('mocha').beforeEach;
var post          = require('mocha').after;
var postEach      = require('mocha').afterEach;
var assertions    = require('mocha').it;
var assert        = require('chai').assert;
var validator     = require('validator');
var exec          = require('child_process').execSync;
var artik_network = require('../src/network');

/* Test Case Module */
testCase('Network', function() {

	pre(function() {
		network = new artik_network();
	});

	testCase('#get_online_status()', function() {
		postEach('Enabling Wifi', function(done){
			this.timeout(15000);
			exec("ifconfig wlan0 up; sleep 1; pkill dhclient; sleep 1; dhclient wlan0;sleep 1");
			done();
		});


		assertions('Online Status - Should return true when it is online', function(done) {
			this.timeout(2000);
			var online_status = network.get_online_status();
			console.log('Status ' + online_status);
			assert.equal(online_status, true);
			done();
		});

		assertions('Online Status - Should return false when it is offline', function(done) {
			this.timeout(2000);
			console.log("Disabling WIFI Adapter");
			exec("ifconfig wlan0 down; sleep 1");
			console.log("Check Online Status")
			var online_status = network.get_online_status();
			assert.equal(online_status, false);
			done();
		});

	});

	testCase('#get_current_public_ip()', function() {

		postEach('Enabling Wifi', function(done) {
			this.timeout(15000);
			exec("ifconfig wlan0 up; sleep 1; pkill dhclient; sleep 1; dhclient wlan0;sleep 1");
			done();
		});

		assertions('Get Current Public Ip - Should return a valid IP', function(done) {
				this.timeout(2000);
				var ip = network.get_current_public_ip();
				console.log("IP Address: " + ip);
				assert( validator.isIP(ip), true );
				done();
		});

		assertions('Get Current Public Ip - Should return null when there is no connectivity', function(done) {
				exec("ifconfig wlan0 down");
				try {
					var ip = network.get_current_public_ip();
					console.log("IP Address: " + ip);
					assert( ip, null );
				} catch (e) {
					console.log("Exception caught while getting ip");
					assert(false);
				}
				done();
		});
	});

	testCase("#on connectivity-change", function() {
		pre(function() {
			this.timeout(3000);
			console.log("Disabling wifi");
			exec("ifconfig wlan0 down; sleep 2");
		});

		postEach('Enabling Wifi', function(done){
			this.timeout(10000);
			network.removeAllListeners("connectivity-change");
			done();
		});

		assertions('Event network-status-change - Should raise this event when deconnection occurs', function(done) {
			network.on("connectivity-change", function(status) {
				assert.equal(status, false);
				done();
			});
		});

		assertions('Event network-status-change - Should raise this event when reconnection occurs', function(done) {
			this.timeout(10000);
			exec("ifconfig wlan0 up; pkill dhclient; dhclient wlan0");
			network.on("connectivity-change", function(status){
				assert.equal(status, true);
				done();
			});
		});
	});
});
