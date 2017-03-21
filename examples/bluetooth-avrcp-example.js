var bluetooth = require('../src/bluetooth');
var bt = new bluetooth();
var avrcp = new bluetooth.Avrcp();
var readline = require('readline');

var remote_addr = "<BT device address>";

function list_item(args, help) {
	var is_browsable = avrcp.controller_get_browsable();
	if (!is_browsable) {
		console.log("list-item is not supported by " + remote_addr);
		return;
	}

	var begin = -1;
	var end = -1;
	if (args.length == 2) {
		begin = parseInt(args[0], 10);
		end = parseInt(args[1], 10)
	}

	var items = avrcp.controller_list_item(begin, end);
	items.forEach(function(e) {
		console.log("Object path: " + e.path);
		console.log("Displayable name: " + e.property.name);
		console.log("Type: " + e.property.type);
		console.log("Folder: " + e.property.folder);
		console.log("Playable: " + e.property.playable);
		console.log("Title: " + e.property.title);
		console.log("Artist: " + e.property.artist);
		console.log("Album: " + e.property.album);
		console.log("Genre: " + e.property.genre);
		console.log("Number of tracks: " + e.property.number_of_tracks);
		console.log("track: " + e.property.number);
		console.log("duration: " + e.property.duration);
	});
}

function change_folder(args, help) {
	var is_browsable = avrcp.controller_get_browsable();
	if (!is_browsable)
	{
		console.log("change-folder is not supported by " + remote_addr);
		return;
	}

	if (args.length != 1)
	{
		help();
		return;
	}

	avrcp.controller_change_folder(args[0]);
	console.log("Change folder to " + args[0] + "... Success");
}

function get_repeat(args, help) {
	var repeat_mode = avrcp.controller_get_repeat_mode();
	console.log("Repeat mode is " + repeat_mode);
}

function set_repeat(args, help) {
	if (args.length != 1) {
	help()
	return;
	}

	avrcp.controller_set_repeat_mode(args[0]);
	console.log("Change repeat mode to " + args[0] + "... Sucess");
}

function play_item(args, help) {
	var is_browsable = avrcp.controller_get_browsable();
	if (!is_browsable)
	{
		console.log("play-item is not supported by " + remote_addr);
		return;
	}

	if (args.length != 1) {
		help();
		return;
	}

	console.log("Play " + args[0]);
	avrcp.controller_play_item(args[0]);
}

function addtoplay(args, help) {
	var is_browsable = avrcp.controller_get_browsable();
	if (!is_browsable)
	{
		console.log("addtoplay is not supported by " + remote_addr);
		return;
	}

	if (args.length != 1) {
		help();
		return;
	}

	console.log("Add " + args[0] + " to the playing list.");
	avrcp.controller_add_to_playing(args[0]);
}

function resume_play(args) {
	avrcp.controller_resume_play();
}

function next(args) {
	avrcp.controller_next();
}

function previous(args) {
	avrcp.controller_previous();
}

function pause(args) {
	avrcp.controller_pause();
}

function stop(args) {
	avrcp.controller_stop();
}

function rewind(args) {
	avrcp.controller_rewind();
}

function fast_forward(args) {
	avrcp.controller_fast_forward();
}

function quit(args) {
	process.exit(0);
}

var commands = [
	{ command: "list-item",
	  description:"List items of current folder",
	  doc: "list-item [start_index end_index]\n    list-item or list-item 1 2",
	  handler: list_item },
	{ command: "change-folder",
	  description: "Change the current folder",
	  doc: "change-folder directory\n    change-folder /org/bluez/hci0/dev_54_40_AD_E2_BE_35/player0/Filesystem/item3/item1",
	  handler: change_folder },
	{ command: "get-repeat",
	  description: "Get the repeat mode.",
	  doc: "get-repeat",
	  handler: get_repeat },
	{ command: "set-repeat",
	  description: "Set the repeat mode.",
	  doc: "set-repeat [singletrack|alltracks|group|off]\n   set-repeat singletrack",
	  handler: set_repeat },
	{ command: "play-item",
	  description: "Play the item.",
	  doc: "play-item item\n    play-item /org/bluez/hci0/dev_54_40_AD_E2_BE_35/player0/Filesystem/item3/item1/item1",
	  handler: play_item },
	{ command: "addtoplay",
	  description: "Add the item to the playing list.",
	  doc: "addtoplay item\n    addtoplay /org/bluez/hci0/dev_54_40_AD_E2_BE_35/player0/Filesystem/item3/item1/item1",
	  handler: addtoplay },
	{ command: "resume-play",
	  description: "Resume play",
	  doc: "resume-play",
	  handler: resume_play },
	{ command: "next",
	  description: "Play the next item.",
	  doc: "next",
	  handler: next },
	{ command: "previous",
	  description: "Play the previous item.",
	  doc: "previous",
	  handler: previous },
	{ command: "pause",
	  description: "Pause the playing item.",
	  doc: "pause",
	  handler: pause },
	{ command: "stop",
	  description: "Stop the playing item.",
	  doc: "stop",
	  handler: stop },
	{ command: "rewind",
	  description: "Rewind the playing item.",
	  doc: "rewind",
	  handler: rewind },
	{ command: "fast-forward",
	  description: "Fast-forward the playing item.",
	  doc: "fast-forward",
	  handler: fast_forward },
	{ command: "quit",
	  description: "Quit application",
	  doc: "quit",
	  handler: quit }
];

function display_help(args)
{
	if (args) {
		var cmd = commands.find(function(item) { return item.command == args[0] });

		if (cmd) {
			console.log(cmd.command + " - " + cmd.description);
			console.log(cmd.doc);
		} else {
			console.log("The " + args[0] + " command does not exist.");
			console.log("Use the help command for help.");
		}
	} else {
		commands.forEach(function (e) { console.log(e.command + " - " + e.description)});
		console.log("help [command] - for more details on a command")
	}
}

function execute_command(line) {
	var argv = line.split(' ');
	var command = argv[0];
	var args = argv.slice(1);

	var cmd = commands.find(function(item) { return item.command == command });
	var help = function() {
		console.log(cmd.command + " - " + cmd.description);
		console.log(cmd.doc);
	};

	if (cmd) {
		cmd.handler(args, help);
	} else if (command == "help") {
		display_help(args);
	} else {
		console.log("The " + command + " command does not exist.");
	}
}

var r1 = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

function findDevice(item) {
	return item.address == remote_addr;
}

bt.on('started', function() {
	console.log('onstarted');
	bt.start_scan();
});

bt.on('scan', function(err, device) {
	console.log('onscan (err = ' + err + '): ' + device);
	if (!err) {
		var dev = JSON.parse(device).find(findDevice);

		if (dev) {
			console.log('Bonding to '+ remote_addr);
			bt.stop_scan();
			bt.start_bond(dev.address);
		}
	}
});

bt.on('bond', function(err, paired) {
	console.log('bonded (err=' + err + '): ' + paired);
	if (!err) {
		console.log("Connect to " + remote_addr);
		bt.connect(remote_addr);
	}
});

bt.on('connect', function(err, connected) {
	console.log('connected (err=' + err + '):' + connected);
	console.log(display_help());
	r1.on('line', function(line) {
		execute_command(line);
	});
});

process.on('SIGINT', function() {
	bt.stop_scan();
	process.exit(0);
});
