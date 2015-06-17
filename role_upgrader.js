module.exports = {
	
	body : [MOVE, CARRY, CARRY, WORK],
	
	run : function(creep) {
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