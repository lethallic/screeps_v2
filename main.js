require("_init");

(function(roleManager, factory){

	// process factory for every room
	for ( var r in Game.rooms ) {
		factory.produce(Game.rooms[r], roleManager);
	}
	
	// process work for creeps
	for ( var c in Game.creeps ) {
		var creep = Game.creeps[c];
		roles.process(creep);
	} 
		
})(
	require("roleManager"),
	require("factory")
);