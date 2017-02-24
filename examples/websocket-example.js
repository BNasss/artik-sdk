var websocket = require('../src/websocket');
var artik = require('../lib/artik-sdk');
var opt = require('getopt'); 

var host = "echo.websocket.org";
var uri = "/";
var port = 80;
var ssl_connection = 0;
var use_se = false;
var test_message = 'ping';

try{
    opt.setopt("t:d:m:s");
} catch (e){
   switch (e.type) {
        case "unknown":
            console.log("Unknown option: -%s", e.opt);
            console.log("Usage: node websocket-example.js [-m <test message>] [-s for enabling SDR (Secure Device Registered) test]");
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
    case 'm':
        test_message = String(p);
        break;
    case 's':
        use_se = true;
        break;
    default:
        console.log("Usage: node websocket-example.js [-m <test message>] [-s for enabling SDR (Secure Device Registered) test]");
        process.exit(0);
    }
});

var conn = new websocket(host, uri, port, ssl_connection, use_se);

conn.open_stream();

conn.on('connected', function(result) {
	console.log("Connect result: " + result);
	conn.write_stream(test_message);
});

conn.on('receive', function(message) {
    console.log("received: " + message);
});

process.on('SIGINT', function () {
    console.log("Close stream");
    conn.close_stream();
    process.exit(0);
});

setTimeout(function () {
    console.log("Time out, close stream");
    conn.close_stream();
    process.exit(0);
}, 5500);
