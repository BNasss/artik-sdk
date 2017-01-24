var events = require('events');
var util = require('util');
var artik = require('../../lib/artik-sdk');

artik.RemoteCharacteristic.prototype.__proto__ = events.EventEmitter.prototype;
artik.GattClient.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = artik.GattClient;
