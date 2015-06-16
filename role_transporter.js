module.exports = {
	
	body : [MOVE, MOVE, CARRY, CARRY],
	
	run : function(creep) {
		if ( creep.energy < creep.energyCapacity ) {
			var energy = creep.pos.findClosest(FIND_DROPPED_ENERGY, {
				filter: function(e) {
					return ( e.energy >= creep.energyCapacity );
				}
			});
			if ( energy ) {
				creep.moveTo(energy);
				creep.pickup(energy);
			}	
		} else {
			var extension = creep.pos.findClosest(FIND_MY_STRUCTURES, {
				filter : function(s) {
					if ( s.structureType == STRUCTURE_EXTENSION ) {
						return (s.energy < s.energyCapacity);
					}
					return false;					
				}
			});
			
			if ( extension ) {
				creep.moveTo(extension);
				creep.transferEnergy(extension);
				return;
			} else {
				var spawn = creep.room.getSpawn();
				if ( spawn ) {
					creep.moveTo(spawn);
					creep.transferEnergy(spawn);
				}
			}
		}
	}
	
};