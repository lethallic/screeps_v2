var Debug = require("_debug")

module.exports = {
	
	body : [MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY],
	
	run : function(creep) {
		
		var flags = creep.room.find(FIND_FLAGS, {
			filter: function(f) {
				return f.color == COLOR_ORANGE;
			}
		});
		if ( flags.length ) {
			creep.moveTo(flags[0]);
			return;
		}
		
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
			
			if ( typeof energy !== "undefined" ) {
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
				if ( spawn && spawn.energy < spawn.energyCapacity ) {
					creep.moveTo(spawn);
					creep.transferEnergy(spawn);
					return;
				}
				
				var upgrader = _.find(creep.room.find(FIND_MY_CREEPS), function(c){
					return ( c.role() === "upgrader" );
					// if ( c.role() === "upgrader" ) {
					// 	return c.energy < c.energyCapacity;
					// }
					// return false;
				});
				
				if ( upgrader ) {
					creep.moveTo(upgrader);
					
					if ( upgrader.energy < upgrader.energyCapacity - 10 ) {
						creep.transferEnergy(upgrader);
					} else {
						creep.dropEnergy();
					}
					
				}
				
				
				// debug.log();
			}
		}
	}
	
};