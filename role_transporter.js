var Debug = require("_debug")

module.exports = {
	
	body : [MOVE, CARRY, CARRY],
	
	run : function(creep) {
		if ( creep.energy == 0 ) { // < creep.energyCapacity ) {
			// var debug = new Debug("FIND DROPPED ENERGY", 2);
			
			var energyList = creep.room.find(FIND_DROPPED_ENERGY, {
				filter : function(e) {
					return ( e.energy >= creep.energyCapacity );
				}
			});
			
			if ( energyList.length ) {
				energy = energyList[0];
			}
			
			if ( energy ) {
				creep.moveTo(energy);
				creep.pickup(energy);
			}
			
			// debug.log();
		} else {
			// var debug = new Debug("FIND EXTENSION", 5);
			
			var extension = creep.pos.findClosest(creep.room.emptyExtensions());
			
			//debug.log();
			
			if ( extension ) {
				// debug = new Debug("DO WORK", 2);
				creep.moveTo(extension);
				creep.transferEnergy(extension);
				// debug.log();
				
				return;
			} else {
				// debug = new Debug("FIND SPAWN", 2);
				var spawn = creep.room.getSpawn();
				if ( spawn ) {
					creep.moveTo(spawn);
					creep.transferEnergy(spawn);
				}
				// debug.log();
			}
		}
	}
	
};