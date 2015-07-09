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
    
    this.rooms = {};
    
    for ( var r in Game.rooms ) {
		this.rooms[r] = new RoomController(this, Game.rooms[r]);
    }
}

utils.extend(GameController.prototype, {
    
    doScout : function(){
        require("scout")()
    },
    
    processRooms : function() {
        for ( var r in this.rooms ) {
        	this.rooms[r].processLinks();
            this.rooms[r].produce();
            this.rooms[r].doCreeps();
        }
    },
    
    processGlobal : function() {
    	
    }
    
});

module.exports = GameController;