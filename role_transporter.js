var Debug = require("_debug")

module.exports = {
	
	body : [MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY],
	body_small : [MOVE, CARRY],
	
	run : function(creep) {
		
		var flags = _.filter(creep.room.getFlags(), function(f) {
			return f.color == COLOR_ORANGE;
		});
		
		if ( flags.length ) {
			creep.moveTo(flags[0]);
			return;
		}
		
		if ( creep.energy == 0 ) { // < creep.energyCapacity ) {
			var debug = new Debug(creep + "FIND DROPPED ENERGY", 5);
			
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
			var debug = new Debug(creep + "FIND EXTENSION", 5);
			
			var extension = null;
			var emptyExtensions = creep.room.emptyExtensions();
			if ( emptyExtensions.length ) {
				extension = creep.pos.findClosest(emptyExtensions);
			}
			
			var links = creep.room.getSenderLinks();
			if ( links.length ) {
				for ( var l in links ) {
					var link = links[l];
					
					
					if ( creep.pos.inRangeTo(links, 10) ) {
						console.log(creep.room, link);
						// creep.moveTo(link);
						// creep.transferEnergy(link);
						// return;
					}	
				}
			}
			

			// debug.log();
			
			if ( extension ) {
				debug = new Debug(creep + "DO WORK", 5);
				creep.moveTo(extension);
				creep.transferEnergy(extension);
				// debug.log();
				
				return;
			} else {
				debug = new Debug(creep + "FIND SPAWN", 5);
				var spawn = creep.room.getSpawn();
				if ( spawn && spawn.energy < spawn.energyCapacity ) {
					creep.moveTo(spawn);
					creep.transferEnergy(spawn);
					return;
				}
				// debug.log();
				
				var upgrader = creep.room.getCreeps("upgrader");
				if ( upgrader.length ) {
					creep.moveTo(upgrader[0]);
					if ( upgrader.energy < upgrader.energyCapacity - 10 ) {
						creep.transferEnergy(upgrader[0]);
					} else if ( creep.pos.isNearTo(upgrader[0]) ) {
						creep.dropEnergy();
					}
				}
			}
		}
	}
	
};