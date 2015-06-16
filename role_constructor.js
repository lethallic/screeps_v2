module.exports = {
	
	body : [MOVE, CARRY, WORK],
	
	run : function(creep) {
		
		if ( creep.energy > 0 ) {
			var target = null;
			
			if ( typeof creep.target() !== "undefined" ) {
				// creep has current target
				var target = Game.getObjectById(creep.target());
			} else {
				var constructions = creep.room.find(FIND_CONSTRUCTION_SITE, {
					filter : function(site) {
						return true;
					}		
				});
				
				if ( constructions.length ) {
				    console.log("fc");
				    
					target = constructions[0];
				} else {
				    var structures = creep.room.find(FIND_STRUCTURE, {
				        filter : function(s) {
				            return s.needsRepair();
				        }
				    });
				    
				    if ( structures.length ) {
				        console.log("fs")
				        target = stuctures[0];
				    }
				    
				}
			}
			
			if ( target ) {
				// build / repair target
				
				console.log(target);
				creep.moveTo(target);
				
				
				if ( target.progress ) {
					console.log("build", creep, creep.build(target));
				} else {
				    console.log("repair", creep, creep.repair(target));
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