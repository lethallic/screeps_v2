module.exports = {
	
	body : [MOVE, MOVE, CARRY],
	
	run : function(creep) {
		if ( creep.energy < creep.energyCapacity ) {
			var energy = creep.pos.findClosest(FIND_DROPPED_ENERGY, function() { return true; });
			if ( energy ) {
				creep.moveTo(energy);
				creep.pickup(energy);
			}	
		} else {
			var spawn = creep.room.getSpawn();
			if ( spawn ) {
				creep.moveTo(spawn);
				creep.transferEnergy(spawn);
			}
		}
	}
	
};