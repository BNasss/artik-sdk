var cloud = require('../src/cloud');
var opt = require('getopt'); 

var access_token = "";
var device_id = "";
var test_message = '';
var use_se = false;

var conn = new cloud();

try{
    opt.setopt("t:d:m:s");
} catch (e){
   switch (e.type) {
        case "unknown":
            console.log("Unknown option: -%s", e.opt);
            console.log("Usage: node cloud-websocket-example.js [-t <access token>] [-d <device id>] [-m <JSON type test message>] [-s for enabling SDR (Secure Device Registered) test]");
            break;
        case "required":
            console.log("Required parameter for option: -%s", e.opt);
            break;
        default:
            console.dir(e);
    }
    process.exit(0);
}

opt.getopt(function (o, p){
    switch(o){
    case 't':
        access_token = String(p);
        break;
    case 'd':
        device_id = String(p);
        break;
    case 'm':
        test_message = String(p);
        break;
    case 's':
        use_se = true;
        break;
    default:
        console.log("Usage: node cloud-websocket-example.js [-t <access token>] [-d <device id>] [-m <JSON type test message>] [-s for enabling SDR (Secure Device Registered) test]");
        process.exit(0);
    }
});

conn.on('receive', function(message) {
	console.log("received: " + message);
});

conn.websocket_open_stream(access_token, device_id, use_se);

process.on('SIGINT', function () {
	console.log("Close stream");
	conn.websocket_close_stream();
	process.exit(0);
});

setInterval(function () {
	conn.websocket_send_message(test_message);
}, 1000);

setTimeout(function() {
	console.log("Time out, close stream");
	conn.websocket_close_stream();
	process.exit(0);
}, 5500);
