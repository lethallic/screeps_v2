var Debug = require("_debug")

module.exports = {
	
	body : [MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY],
	body_small : [MOVE, CARRY],
	
	run : function(creep) {
		
	//	var flags =_.(Game.flags, filter: function(f) {
	//			return f.color == COLOR_ORANGE;
	//	});
	//	if ( flags.length ) {
	//		creep.moveTo(flags[0]);
	//		return;
	//	}
	
	
		
		// var upgrader = _.filter(creep.room.find(FIND_MY_CREEPS), function(c){
		// 	return ( c.role() === "upgrader" );
		// 	// if ( c.role() === "upgrader" ) {
		// 	// 	return c.energy < c.energyCapacity;
		// 	// }
		// 	// return false;
		// });
		
		var upgrader = creep.room.getCreeps("upgrader");
		
		if ( creep.energy == 0 ) { // < creep.energyCapacity ) {
			// var debug = new Debug("FIND DROPPED ENERGY", 2);
			
			var energyList = _.filter(creep.room.droppedEnergy(), function(e) {
			    return !e.pos.inRangeTo(e.room.controller, 2);
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