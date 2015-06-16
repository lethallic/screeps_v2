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
						
					}		
				});
			}
			
			if ( target ) {
				// build / repair target
				
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