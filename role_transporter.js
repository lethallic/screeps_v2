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
		
		var upgrader = _.filter(creep.room.find(FIND_MY_CREEPS), function(c){
			return ( c.role() === "upgrader" );
			// if ( c.role() === "upgrader" ) {
			// 	return c.energy < c.energyCapacity;
			// }
			// return false;
		});
		
		if ( creep.energy == 0 ) { // < creep.energyCapacity ) {
			// var debug = new Debug("FIND DROPPED ENERGY", 2);
			
			var energyList = creep.room.find(FIND_DROPPED_ENERGY, {
				filter : function(e) {
				    return !e.pos.isNearTo(upgrader, 3);
					// return ( e.energy >= creep.energyCapacity );
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
				
				if ( upgrader.length ) {
					creep.moveTo(upgrader[0]);
					if ( upgrader.energy < upgrader.energyCapacity - 10 ) {
						creep.transferEnergy(upgrader[0]);
					} else if ( creep.pos.isNearTo(upgrader[0]) ) {
						creep.dropEnergy();
					}
				}
				// debug.log();
			}
		}
	}
	
};