var events = require('events');
var util = require('util');
var cloud = require('../lib/artik-sdk').cloud;

var Cloud = function(token) {
	events.EventEmitter.call(this);
	this.cloud = new cloud(token);
}

util.inherits(Cloud, events.EventEmitter);

module.exports = Cloud;

Cloud.prototype.send_message = function send_message(device_id, message, response_cb) {
    return this.cloud.send_message(device_id, message, response_cb);
};

Cloud.prototype.send_action = function send_action(device_id, action, response_cb) {
    return this.cloud.send_action(device_id, action, response_cb);
};

Cloud.prototype.get_current_user_profile = function get_current_user_profile(response_cb) {
    return this.cloud.get_current_user_profile(response_cb);
};

Cloud.prototype.get_user_devices = function get_user_devices(count, properties, offset, user_id, response_cb) {
    return this.cloud.get_user_devices(count, properties, offset, user_id, response_cb);
};

Cloud.prototype.get_user_device_types = function get_user_device_types(count, shared, offset, user_id, response_cb) {
    return this.cloud.get_user_device_types(count, shared, offset, user_id, response_cb);
};

Cloud.prototype.get_user_application_properties = function get_user_application_properties(user_id, app_id, response_cb) {
    return this.cloud.get_user_application_properties(user_id, app_id, response_cb);
};

Cloud.prototype.add_device = function add_device(user_id, device_type_id, name, response_cb) {
    return this.cloud.add_device(user_id, device_type_id, name, response_cb);
};

Cloud.prototype.get_device = function get_device(device_id, properties, response_cb) {
    return this.cloud.get_device(device_id, properties, response_cb);
};

Cloud.prototype.get_device_token = function get_device_token(device_id, response_cb) {
    return this.cloud.get_device_token(device_id, response_cb);
};

Cloud.prototype.update_device_token = function update_device_token(device_id, response_cb) {
    return this.cloud.update_device_token(device_id, response_cb);
};

Cloud.prototype.delete_device_token = function delete_device_token(device_id, response_cb) {
    return this.cloud.delete_device_token(device_id, response_cb);
};

Cloud.prototype.delete_device = function delete_device(user_id, device_type_id, name, response_cb) {
    return this.cloud.delete_device(user_id, device_type_id, name, response_cb);
};

Cloud.prototype.websocket_open_stream = function websocket_open_stream(access_token, device_id, use_se) {
        var _ = this;
	return this.cloud.websocket_open_stream(access_token, device_id, use_se, 
                function(message) {
	               _.emit('receive', message);
	        },
                function(status) {
                        _.emit('connected', status);
                });
};

Cloud.prototype.websocket_send_message = function websocket_send_message(message) {
	return this.cloud.websocket_send_message(message);
};

Cloud.prototype.websocket_close_stream = function websocket_close_stream() {
	return this.cloud.websocket_close_stream();
};

Cloud.prototype.sdr_start_registration = function sdr_start_registration(device_type_id, vendor_id, response_cb) {
    return this.cloud.sdr_start_registration(device_type_id, vendor_id, response_cb);
};

Cloud.prototype.sdr_registration_status = function sdr_registration_status(registration_id, response_cb) {
    return this.cloud.sdr_registration_status(registration_id, response_cb);
}

Cloud.prototype.sdr_complete_registration = function sdr_complete_registration(registration_id, nonce, response_cb) {
    return this.cloud.sdr_complete_registration(registration_id, nonce, response_cb);
};
