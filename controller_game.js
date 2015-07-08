var utils = require("_utils");

var RoomController = require("controller_room");

/**
(function(roleManager, factory){
	var cpuStart = 0;
	
	// scout
	require("scout")();
	
	// process factory for every room
	for ( var r in Game.rooms ) {
		factory.produce(Game.rooms[r], roleManager);
		// console.log(Game.rooms[r].sourcesEx());
	}
	var cpuFactory = Game.getUsedCpu();
	
	// build defence
	if ( Game.creeps.length > 20 ) {
		for ( var s in Game.spawns ) {
			var spawn = Game.spawns[s];
			if ( spawn ) {
				// factory.buildDefence(spawn, roleManager)
			}
			continue;
		}
	}
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
 */



function GameController() {
    this.roleManager = require("roleManager");
    this.factory = require("factory");
}

utils.extend(GameController.prototype, {
    
    doScout : function(){
        require("scout")()
    },
    
    processRooms : function() {
        for ( var r in Game.rooms ) {
            var rc = new RoomController(this, Game.rooms[r]);
            
            rc.produce();
            rc.doCreeps();
        }
    }
    
});

module.exports = GameController;