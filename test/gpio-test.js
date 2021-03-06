/* Global Includes */
var testCase       = require('mocha').describe;
var pre            = require('mocha').before;
var preEach        = require('mocha').beforeEach;
var post           = require('mocha').after;
var postEach       = require('mocha').afterEach;
var assertions     = require('mocha').it;
var assert         = require('chai').assert;
var validator      = require('validator');
var exec           = require('child_process').execSync;
var artik          = require('../lib/artik-sdk');
var runManualTests = process.env.RUN_MANUAL_TESTS;


/* Test Specific Includes */
var gpio  = require('../src/gpio');
var button, red, green, blue;

/* Test Case Module */
testCase('GPIO', function() {

	pre(function() {
		const name = artik.get_platform_name();

		if(name == 'ARTIK 520') {
			console.log('Running GPIO test on ARTIK 520');
			const a5 = require('../src/platform/artik520');
			red      = new gpio(a5.ARTIK_A5_GPIO_XEINT0, 'red', 'out', 'none', 0);
			green    = new gpio(a5.ARTIK_A5_GPIO_XEINT1, 'green', 'out', 'none', 0);
			blue     = new gpio(a5.ARTIK_A5_GPIO_XEINT2, 'blue', 'out', 'none', 0);
			button   = new gpio(a5.ARTIK_A5_GPIO_XEINT3, 'button', 'in', 'both', 0);
		} else if(name == 'ARTIK 1020') {
			console.log('Running GPIO test on ARTIK 1020');
			const a10 = require('../src/platform/artik1020');
			red       = new gpio(a10.ARTIK_A10_GPIO_XEINT0, 'red', 'out', 'none', 0);
			green     = new gpio(a10.ARTIK_A10_GPIO_XEINT1, 'green', 'out', 'none', 0);
			blue      = new gpio(a10.ARTIK_A10_GPIO_XEINT2, 'blue', 'out', 'none', 0);
			button    = new gpio(a10.ARTIK_A10_GPIO_XEINT3, 'button', 'in', 'both', 0);
		} else if(name == 'ARTIK 710') {
			console.log('Running GPIO test on ARTIK 710');
			const a7 = require('../src/platform/artik710');
			red      = new gpio(a7.ARTIK_A710_GPIO_GPIO0, 'red', 'out', 'none', 0);
			green    = new gpio(a7.ARTIK_A710_GPIO_GPIO1, 'green', 'out', 'none', 0);
			blue     = new gpio(a7.ARTIK_A710_GPIO_GPIO2, 'blue', 'out', 'none', 0);
			button   = new gpio(a7.ARTIK_A710_GPIO_GPIO4, 'button', 'in', 'both', 0);
		} else if(name == 'ARTIK 530') {
			console.log('Running GPIO test on ARTIK 530');
			const a530 = require('../src/platform/artik530');
			red      = new gpio(a530.ARTIK_A530_GPIO_GPIO0, 'red', 'out', 'none', 0);
			green    = new gpio(a530.ARTIK_A530_GPIO_GPIO1, 'green', 'out', 'none', 0);
			blue     = new gpio(a530.ARTIK_A530_GPIO_GPIO2, 'blue', 'out', 'none', 0);
			button   = new gpio(a530.ARTIK_A530_GPIO_GPIO4, 'button', 'in', 'both', 0);
		}

		red.request();
		green.request();
		blue.request();

		red.write(0);
		blue.write(0);
		green.write(0);

	});

	testCase('#write #read', function() {

		assertions('Sets the GPIO Level', function() {

			red.write(1);
			blue.write(1);
			green.write(1);

			assert.equal(red.read(), 1);
			assert.equal(green.read(), 1);
			assert.equal(blue.read(), 1);

		});

	});

    testCase('#button', function() {

        assertions('Get Button Press Event', function(done) {

            if (!runManualTests)
                this.skip();

            this.timeout(10000);
            console.log("Please press the button within 10 seconds ");
            button.on('changed', function(val) {
                console.log("Button state: " + val);
                done();
            });
	    button.request();

        });

    });

	post(function() {
		red.release();
		green.release();
		blue.release();
		button.release();
	});

});
