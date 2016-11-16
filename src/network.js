var events = require('events');
var util = require('util');
var network = require('../lib/artik-sdk').network;

var Network = function() {
    events.EventEmitter.call(this);
    var _ = this;
    this.network = new network(function(val) {
        _.emit('connectivity-change', val);
    });
}

util.inherits(Network, events.EventEmitter);
module.exports = Network;

Network.prototype.get_current_ip = function get_current_ip() {
    return this.network.get_current_ip();
}

Network.prototype.get_online_status = function get_online_status() {
    return this.network.get_online_status();
}
