var Debug = require("_debug")

module.exports = {
	
	body : [MOVE, CARRY, MOVE , CARRY],
	
	run : function(creep) {
		if ( creep.energy == 0 ) { // < creep.energyCapacity ) {
			var debug = new Debug("FIND DROPPED ENERGY", 2);
			
			// var energy = creep.pos.findClosest(FIND_DROPPED_ENERGY, {
			//	filter: function(e) {
			//		return ( e.energy >= creep.energyCapacity );
			//	}
			// });
			
			var energy = creep.pos.findClosest(creep.room.droppedEnergy(),{
				"algorithm" : "dijkstra"
			});
			
			if ( energy ) {
				creep.moveTo(energy);
				creep.pickup(energy);
			}
			
			debug.log();
		} else {
			var debug = new Debug("FIND EXTENSION", 2);
			
			var extension = creep.pos.findClosest(FIND_MY_STRUCTURES, {
				filter : function(s) {
					if ( s.structureType == STRUCTURE_EXTENSION ) {
						return (s.energy < s.energyCapacity);
					}
					return false;					
				}
			});
			debug.log();
			
			if ( extension ) {
				debug = new Debug("DO WORK", 2);
				creep.moveTo(extension);
				creep.transferEnergy(extension);
				debug.log();
				
				return;
			} else {
				debug = new Debug("FIND SPAWN", 2);
				var spawn = creep.room.getSpawn();
				if ( spawn ) {
					creep.moveTo(spawn);
					creep.transferEnergy(spawn);
				}
				debug.log();
			}
		}
	}
	
};