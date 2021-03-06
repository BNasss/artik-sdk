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
var time       = require('../src/time.js');

var module     = new time();

/* Test Specific Includes */
var platform, format_date, time_zone;
var end      = 1;
var valtime  = 0;
var hostname = "0.pool.ntp.org";
var platform, str;

/* Test Case Module */
testCase('Time', function() {

	pre(function() {

		str = module.get_time_str(time.ARTIK_TIME.DFORMAT_DATE, time.ARTIK_TIME.ZONE.GMT2);

		exec("systemctl stop systemd-timesyncd.service");

	});

	testCase('#get_time()', function() {

		assertions('Returns the current time', function(done) {
			var new_date = module.get_time();
			console.log(new_date.toUTCString());
			assert.equal(new_date.toUTCString(), (new Date()).toUTCString());
			done();
		});

	});

	var dates = [module.get_time(), new Date(Date.UTC(2016, 9, 28, 11, 00, 23))];
	dates.forEach(function(date) {
		testCase('#set_time() with inital date = ' + date, function() {
			pre(function(done) {
				module.set_time(date);
				done();
			});

			assertions('Sets the system time', function(done) {
				this.timeout(121000);
				var new_date = module.get_time();
				var initial_date = module.get_time();
				console.log("Init Time " + initial_date.toUTCString());
				new_date.setUTCMinutes(initial_date.getUTCMinutes()+2);
				module.set_time(new_date);
				console.log("New time " + module.get_time().toUTCString());
				var diff = module.get_time().getTime() - initial_date.getTime();
				assert.equal(diff, 120000);
				done();
			});
		});
	});

	testCase('#set_time - Should be throw if the argument is invalid', function() {
		assertions('Should be throw if the argument is invalid', function(done) {
			assert.throws(function() { module.set_time(15) }, TypeError, "Invalid argument");
			done();
		});
	});

	testCase('#create_alarm_date()', function() {

		assertions('create alarm ', function(done) {

			this.timeout(10000);

			console.log("Set an alarm event in 5 seconds");
			var new_date = module.get_time();
			new_date.setUTCSeconds(new_date.getUTCSeconds()+5);

			module.create_alarm_date(time_zone, new_date, function() {
				console.log("Alarm Event");
				done();
			});

		});

	});

	testCase('#sync_ntp()', function() {


		pre(function() {

		});

		assertions('Syncs time with the NTP server', function() {
			this.enableTimeouts(false);
			var new_date  = module.get_time();
			new_date.setUTCSeconds(new_date.getUTCSeconds()+120);
			module.set_time(new_date);
			ret = module.sync_ntp(hostname);
			assert.equal((new Date()).toUTCString(), module.get_time().toUTCString());
		});

	});



});
