const artik = require('../lib/artik-sdk');
const artik_network = require('../src/network');

network = new artik_network();

console.log("Your IP is " + network.get_current_public_ip());

var online_status = network.get_online_status();
console.log("Status : " + online_status);

network.on("connectivity-change", function(status) {
    console.log("Status change : " + status);
});
