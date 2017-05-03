var artik = require('../lib/artik-sdk');
var host = 'api.artik.cloud';
var port = 8883;
var akc_device_id = process.env.MQTT_DEVICE_ID;
var akc_device_token = process.env.MQTT_DEVICE_TOKEN;
var akc_msg = '{ "state": true }';  // Change for a message supported by
                                    //  the device's manifest
const akc_ca_root =
	"-----BEGIN CERTIFICATE-----\n" +
	"MIIE0zCCA7ugAwIBAgIQGNrRniZ96LtKIVjNzGs7SjANBgkqhkiG9w0BAQUFADCB\r\n" +
	"yjELMAkGA1UEBhMCVVMxFzAVBgNVBAoTDlZlcmlTaWduLCBJbmMuMR8wHQYDVQQL\r\n" +
	"ExZWZXJpU2lnbiBUcnVzdCBOZXR3b3JrMTowOAYDVQQLEzEoYykgMjAwNiBWZXJp\r\n" +
	"U2lnbiwgSW5jLiAtIEZvciBhdXRob3JpemVkIHVzZSBvbmx5MUUwQwYDVQQDEzxW\r\n" +
	"ZXJpU2lnbiBDbGFzcyAzIFB1YmxpYyBQcmltYXJ5IENlcnRpZmljYXRpb24gQXV0\r\n" +
	"aG9yaXR5IC0gRzUwHhcNMDYxMTA4MDAwMDAwWhcNMzYwNzE2MjM1OTU5WjCByjEL\r\n" +
	"MAkGA1UEBhMCVVMxFzAVBgNVBAoTDlZlcmlTaWduLCBJbmMuMR8wHQYDVQQLExZW\r\n" +
	"ZXJpU2lnbiBUcnVzdCBOZXR3b3JrMTowOAYDVQQLEzEoYykgMjAwNiBWZXJpU2ln\r\n" +
	"biwgSW5jLiAtIEZvciBhdXRob3JpemVkIHVzZSBvbmx5MUUwQwYDVQQDEzxWZXJp\r\n" +
	"U2lnbiBDbGFzcyAzIFB1YmxpYyBQcmltYXJ5IENlcnRpZmljYXRpb24gQXV0aG9y\r\n" +
	"aXR5IC0gRzUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCvJAgIKXo1\r\n" +
	"nmAMqudLO07cfLw8RRy7K+D+KQL5VwijZIUVJ/XxrcgxiV0i6CqqpkKzj/i5Vbex\r\n" +
	"t0uz/o9+B1fs70PbZmIVYc9gDaTY3vjgw2IIPVQT60nKWVSFJuUrjxuf6/WhkcIz\r\n" +
	"SdhDY2pSS9KP6HBRTdGJaXvHcPaz3BJ023tdS1bTlr8Vd6Gw9KIl8q8ckmcY5fQG\r\n" +
	"BO+QueQA5N06tRn/Arr0PO7gi+s3i+z016zy9vA9r911kTMZHRxAy3QkGSGT2RT+\r\n" +
	"rCpSx4/VBEnkjWNHiDxpg8v+R70rfk/Fla4OndTRQ8Bnc+MUCH7lP59zuDMKz10/\r\n" +
	"NIeWiu5T6CUVAgMBAAGjgbIwga8wDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8E\r\n" +
	"BAMCAQYwbQYIKwYBBQUHAQwEYTBfoV2gWzBZMFcwVRYJaW1hZ2UvZ2lmMCEwHzAH\r\n" +
	"BgUrDgMCGgQUj+XTGoasjY5rw8+AatRIGCx7GS4wJRYjaHR0cDovL2xvZ28udmVy\r\n" +
	"aXNpZ24uY29tL3ZzbG9nby5naWYwHQYDVR0OBBYEFH/TZafC3ey78DAJ80M5+gKv\r\n" +
	"MzEzMA0GCSqGSIb3DQEBBQUAA4IBAQCTJEowX2LP2BqYLz3q3JktvXf2pXkiOOzE\r\n" +
	"p6B4Eq1iDkVwZMXnl2YtmAl+X6/WzChl8gGqCBpH3vn5fJJaCGkgDdk+bW48DW7Y\r\n" +
	"5gaRQBi5+MHt39tBquCWIMnNZBU4gcmU7qKEKQsTb47bDN0lAtukixlE0kF6BWlK\r\n" +
	"WE9gyn6CagsCqiUXObXbf+eEZSqVir2G3l6BFoMtEMze/aiCKm0oHw0LxOXnGiYZ\r\n" +
	"4fQRbxC1lfznQgUy286dUV4otp6F01vvpX1FQHKOtw5rDgb7MzVIcbidJ4vEZV8N\r\n" +
	"hnacRHr2lVz2XTIIM6RUthg/aFzyQkqFOFSDX9HoLPKsEdao7WNq\r\n" +
	"-----END CERTIFICATE-----\n";

if (!akc_device_id || !akc_device_token) {
    console.log("MQTT_DEVICE_ID and MQTT_DEVICE_TOKEN environment " +
                " variables must be set before running this program.");
    process.exit(-1);
}

var ssl_config = {
    ca_cert: Buffer.from(akc_ca_root),
    verify_cert: "required"
}

var mqtt = new(require('../src/mqtt.js'))('artik_mqtt_client',
					  akc_device_id,
					  akc_device_token,
					  false,
					  0,
					  true,
					  ssl_config);

mqtt.on('disconnected', function(result) {
    console.log('on disconnected: ' + result);
    process.exit(0);
});

mqtt.on('published', function(mid) {
    console.log('on published: ' + mid);
});

mqtt.on('received', function(mid, topic, buffer, qos, retain) {
    console.log('Received message');
    console.log('\tmid: ' + mid);
    console.log('\tqos: ' + qos);
    console.log('\tretain: ' + retain);
    console.log('\ttopic: ' + topic);
    console.log('\tdata: ' + buffer);
});

mqtt.on('subscribed', function(mid) {
    console.log('on subscribed: ' + mid);
    /* Publish a message */
    mqtt.publish(0, false, '/v1.1/messages/' + akc_device_id, new Buffer(akc_msg));
});

mqtt.on('unsubscribed', function(mid) {
    console.log('on unsubscribed: ' + mid);
});

process.on('SIGINT', function () {
    mqtt.disconnect();
});

mqtt.on('connected', function(result) {
    console.log('on connected: ' + result);

    /* Subscribe to receive actions ¨*/
    mqtt.subscribe(0, '/v1.1/actions/' + akc_device_id);
});

mqtt.on('started', function() {
    console.log('on started');
    mqtt.connect(host, port);
});


