module.exports = {
	
	body : [MOVE, CARRY, WORK],
	
	run : function(creep) {
		
		if ( creep.energy > 0 ) {
			var target = null;
			
			if ( creep.target() !== "" ) {
				// creep has current target
				var target = Game.getObjectById(creep.target());
			} else {
				var constructions = creep.room.find(FIND_CONSTRUCTION_SITE, {
					filter : function(site) {
						return true;
					}		
				});
				
				if ( constructions.length ) {
					target = constructions[0];
				} else {
					target = creep.pos.findClosest(FIND_STRUCTURE, function(s) {
						if ( s.my || s.structureType == STRUCTURE_ROAD ) {
							return s.needsRepair();
						}
					});
				}
			}
			
			if ( target ) {
				// build / repair target
				creep.moveTo(target);
				if ( target.progress ) {
					creep.build(target);
				} else {
					creep.repair(target);
				}
				creep.target(target.id);
			}
			
		} else if ( creep.energy == 0 ) {
			// goto spawn, get energy
			var spawn = creep.room.getSpawn();
			if ( spawn ) {
				creep.moveTo(spawn);
				spawn.transferEnergy(creep);				
			}
			creep.target("");			
		}
	}
	
};