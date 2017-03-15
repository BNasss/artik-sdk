/*
 * Time module test. Note that any running NTP service must be disabled prio
 * to running this test. On Fedora based ARTIK boards, use the following command:
 *
 *   $ systemctl stop systemd-timesyncd
 */
var time    = require('../src/time.js');

var module  = new time();
var alarm_1 = null;
var alarm_2 = null;
var hostname = "fr.pool.ntp.org";

console.log("Synchronizing with NTP server " + hostname);
console.log(module.sync_ntp(hostname) == 0 ? "Sync successful": "Sync failed");

var curr_date = module.get_time();
var alarm1_date = module.get_time();
var alarm2_date = module.get_time();

alarm1_date.setUTCSeconds(alarm1_date.getUTCSeconds() + 5);
alarm2_date.setUTCSeconds(alarm2_date.getUTCSeconds() + 20);

console.log("Current time is " + curr_date.toUTCString());
console.log("Set alarm 1 to trigger at " + alarm1_date.toUTCString());
console.log("Set alarm 2 to trigger at " + alarm2_date.toUTCString());

try {
    alarm_1 = module.create_alarm_date(alarm1_date.getTimezoneOffset() / 60, alarm1_date, function() {
        console.log("Alarm 1 triggered, it is " + module.get_time().toUTCString());
    });
} catch (err) {
    console.log("[ERROR] create_alarm : " + err);
    process.exit(-1);
}

try {
    alarm_2 = module.create_alarm_second(alarm2_date.getTimezoneOffset() / 60, 20, function() {
        console.log("Alarm 2 triggered, it is " + module.get_time().toUTCString());
        process.exit(0);
    });
} catch (err) {
    console.log("[ERROR] create_alarm : " + err);
    process.exit(-1);
}

process.on('SIGINT', () => {
    process.exit(-1);
});
