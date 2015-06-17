require("_init");

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

for ( var i = 0; i < _messages.length; i++ ) {
	console.log(_messages[i]);
}