var events = require('events');
var util = require('util');
var mqtt = require('../lib/artik-sdk').mqtt;

var Mqtt = function(device_name, device_id, device_token, clean, keep_aliven, block) {
    events.EventEmitter.call(this);
    _ = this;
    this.mqtt = new mqtt(device_name, device_id, device_token, clean, keep_aliven, block,
			 function(result) {
    			     _.emit('connected', result);
			 },
			 function(result) {
    			     _.emit('disconnected', result);
			 },
			 function(mid) {
    			     _.emit('subscribed', mid);
			 },
			 function(mid) {
    			     _.emit('unsubscribed', mid);
			 },
			 function(mid) {
    			     _.emit('published', mid);
			 },
			 function(mid, topic, buffer, qos, retain) {
    			     _.emit('received', mid, topic, buffer, qos, retain);
			 });
    setImmediate(function() {
	_.emit('started');
    });
}

util.inherits(Mqtt, events.EventEmitter);

module.exports = Mqtt;

Mqtt.prototype.set_willmsg = function(topic, message, qos, retain) {
    return this.mqtt.set_willmsg(topic, message, qos, retain);
}

Mqtt.prototype.free_willmsg = function() {
    return this.mqtt.free_willmsg();
}

Mqtt.prototype.clear_willmsg = function() {
    return this.mqtt.clear_willmsg();
}

Mqtt.prototype.tls_set = function(ca_file, ca_path, cert_file, key_file) {
    return this.mqtt.tls_set(ca_file, ca_path, cert_file, key_file);
}

Mqtt.prototype.tls_insecure_set = function(insecure) {
    return this.mqtt.tls_insecure_set(insecure);
}

Mqtt.prototype.tls_opts_set = function(reqs, version, ciphers) {
    return this.mqtt.tls_opts_set(reqs, version, ciphers);
}

Mqtt.prototype.tls_psk_set = function(key, identity, ciphers) {
    return this.mqtt.tls_psk_set(key, identity, ciphers);
}

Mqtt.prototype.connect = function(host, port, callback) {
    return this.mqtt.connect(host, port, callback);
}

Mqtt.prototype.disconnect = function(callback) {
    return this.mqtt.disconnect(callback);
}

Mqtt.prototype.subscribe = function(qos, topic, callbackSubscribe, callbackReceive) {
    return this.mqtt.subscribe(qos, topic, callbackSubscribe, callbackReceive);
}

Mqtt.prototype.unsubscribe = function(topic, callback) {
    return this.mqtt.unsubscribe(topic, callback);
}

Mqtt.prototype.publish = function(qos, retain, topic, buffer, callbackPublish) {
    return this.mqtt.publish(qos, retain, topic, buffer, callbackPublish);
}
