module.exports = {
	
	body : [MOVE, CARRY, CARRY, WORK, WORK, WORK, WORK, WORK],
	body_small : [MOVE, WORK, CARRY, CARRY],
	body_big : [MOVE, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, WORK, WORK, WORK],
	
	// body : [MOVE, MOVE, CARRY, CARRY, CARRY, WORK, WORK, WORK, MOVE, CARRY, WORK],
	// body_small : [MOVE, MOVE, MOVE, CARRY, CARRY, WORK],
	
	run : function(creep) {
		
		var flags = _.filter(creep.room.getFlags(), function(f) {
			return f.color == COLOR_YELLOW;
		});
		
		if ( flags.length ) {
			creep.moveTo(flags[0]);
			return;
		}
		
		var controller = creep.room.controller;
		if ( controller && controller.my ) {
			var link = creep.pos.findInRange(FIND_MY_STRUCTURES, 2, { filter: { structureType: STRUCTURE_LINK } });
			console.log(creep, link);
			
			// if ( creep.enery == 0 ) {
			// 	var energy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 2);
				
				
			// }
			
			
		    if ( creep.energy == 0 && energy.length ) {
		    	if ( creep.pickup(energy[0]) != OK ) {
					creep.moveTo(energy[0]);
		    	}
		    } else if ( !creep.pos.isNearTo(controller) ) {
				creep.moveTo(controller);
			} else if ( creep.energy > 0 ) {
				creep.upgradeController(controller);
			}
		}
		
		
		// if ( creep.energy == 0 ) {
		// 	// goto spawn
		// 	var spawn = creep.room.getSpawn();
		// 	if ( spawn ) {
		// 		creep.moveTo(spawn);
		// 		spawn.transferEnergy(creep);
		// 	}
		// } else {
		// 	// upgrade controller
		// 	var controller = creep.room.controller;
		// 	if ( controller && controller.my ) {
		// 		creep.moveTo(controller);
		// 		creep.upgradeController(controller);
		// 	}
		// }
	}
	
};