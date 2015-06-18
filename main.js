require("_init");

var RoomObjects = require("roomObjects");

var DEBUG = false;
var _messages = [];

(function(roleManager, factory){
	var cpuStart = 0;
	
	
	// process factory for every room
	for ( var r in Game.rooms ) {
		var objects = new RoomObjects(Game.rooms[r]);
		for ( var e in objects ) {
			console.log(e, objects[e]());
		}
		
		factory.produce(Game.rooms[r], roleManager);
	}
	var cpuFactory = Game.getUsedCpu();
	
	_messages.push("Factory: " + (cpuFactory - cpuStart));
	
	
	// process work for creeps
	for ( var c in Game.creeps ) {
		var creep = Game.creeps[c];
		roleManager.process(creep);
	}
	var cpuRoles = Game.getUsedCpu();
	_messages.push("Roles: " + (cpuRoles - cpuFactory));
		
})(
	require("roleManager"),
	require("factory")
);

if ( DEBUG ) {
	console.log("DEBUG - Used CPU", _messages);
}