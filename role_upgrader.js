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
			if ( creep.energy == 0 ) {
			    var energy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 3);
				var links = creep.pos.findInRange(creep.room.getLinks(), 3);
				
				if ( energy.length ) {
			    	if ( creep.pickup(energy[0]) != OK ) {
						creep.moveTo(energy[0]);
						return;
			    	}
				} else if ( links.length ) {
					if ( links[0].transferEnergy(creep) != OK ) {
						creep.moveTo(links[0]);
						return;
					}
				}
		    }
		    
		    if ( !creep.pos.isNearTo(controller) ) {
				creep.moveTo(controller);
			} else if ( creep.energy > 0 ) {
				creep.upgradeController(controller);
			}
		}
	}
	
};