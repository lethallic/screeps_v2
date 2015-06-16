module.exports = {
	
	body : [MOVE, CARRY, WORK],
	
	run : function(creep) {
		
		if ( creep.energy > 0 ) {
			var target = null;
			
			if ( typeof creep.target() !== "undefined" ) {
				// creep has current target
				var target = Game.getObjectById(creep.target());
				if ( target && target._type ) {
					if ( target._type = "struction" && !target.needsRepair ) {
						target = null;
					}
				} else {
				    target = null;
				}
			} 
			
			if  ( !target ) {
				var constructions = creep.room.find(FIND_CONSTRUCTION_SITES, {
					filter : function(site) {
						return true;
					}		
				});
				
				if ( constructions.length > 0 ) {
					target = constructions[0];
				} else {
				    // console.log("structures");
				    
				    var structures = creep.room.find(FIND_STRUCTURES, {
				        filter : function(s) {
				            console.log("found", s);
				            return s.needsRepair();
				        }
				    });
				    console.log(structures);
				    
				    if ( structures.length ) {
				        console.log("fs")
				        target = structures[0];
				    }
				    
				}
			}
			
			if ( target ) {
				// build / repair target
				creep.moveTo(target);
				
				if ( target.progress ) {
					// console.log("build", creep, creep.build(target));
				} else {
				    //console.log("repair", creep, creep.repair(target));
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