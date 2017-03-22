var readline = require('readline');

var CommandLine = function(commands) {
	this.commands = commands;
	this.r1 = null;
}

CommandLine.prototype.execute_command = function(line) {
	var argv = line.split(' ');
	var command = argv[0];
	var args = argv.slice(1);

	var cmd = this.commands.find(function(item) { return item.command == command });
	var help = function() {
		console.log(cmd.command + " - " + cmd.description);
		console.log(cmd.doc);
	};

	if (cmd) {
		cmd.handler(args, help);
	} else if (command == "help") {
		this.display_help(args[0]);
	} else {
		console.log("The " + command + " command does not exist.");
	}
};

CommandLine.prototype.display_help = function(command) {
	if (command) {
		var cmd = this.commands.find(function(item) { return item.command == command });

		if (cmd) {
			console.log(cmd.command + " - " + cmd.description);
			console.log(cmd.doc);
		} else {
			console.log("The " + args[0] + " command does not exist.");
			console.log("Use the help command for help.");
		}
	} else {
		this.commands.forEach(function (e) { console.log(e.command + " - " + e.description)});
	    console.log("help [command] - for more details on a command");
	}
};

CommandLine.prototype.process = function() {
	this.r1 = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		terminal: false
	});
	var _ = this;
	this.display_help();
	this.r1.on('line', function(line) {
		_.execute_command(line);
	});
};

module.exports = CommandLine;
