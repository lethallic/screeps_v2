module.exports = {
	
	body : [MOVE, MOVE, CARRY, CARRY, CARRY, WORK, WORK, WORK], //, MOVE, CARRY, WORK],
	
	run : function(creep) {
		
		var flags = creep.room.find(FIND_FLAGS, {
			filter: function(f) {
				return f.color == COLOR_YELLOW;
			}
		});
		if ( flags.length ) {
			creep.moveTo(flags[0]);
			return;
		}
		
		if ( creep.energy == 0 ) {
			// goto spawn
			var spawn = creep.room.getSpawn();
			if ( spawn ) {
				creep.moveTo(spawn);
				spawn.transferEnergy(creep);
			}
		} else {
			// upgrade controller
			var controller = creep.room.controller;
			if ( controller && controller.my ) {
				creep.moveTo(controller);
				creep.upgradeController(controller);
			}
		}
	}
	
};