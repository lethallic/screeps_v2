require("_init");

var DEBUG = false;
var _messages = [];

(function(roleManager, factory){
	var cpuStart = 0;
	
	
	// process factory for every room
	for ( var r in Game.rooms ) {
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