var Debug = require("_debug");
module.exports = {
	
	body : [MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, WORK],
	
	run : function(creep) {
		var debug;
		
		var flags = creep.room.find(FIND_FLAGS, {
			filter: function(f) {
				return f.color == COLOR_BLUE;
			}
		});
		if ( flags.length ) {
			creep.target("");
			creep.moveTo(flags[0]);
			return;
		}
		
		
		if ( creep.energy > 0 ) {
			var target = null;
			
			if ( typeof creep.target() !== "undefined" ) {
				// creep has current target
				debug = new Debug("check target", 1);
				
				var target = Game.getObjectById(creep.target());
				if ( target && target._type ) {
					if ( target._type == "structure" && !target.needsRepair() ) {
						target = null;
					}
				} else {
				    target = null;
				}
				debug.log();
			} 
			
			if  ( !target ) {
				debug = new Debug("find constructions", 5);
				var constructions = creep.room.find(FIND_CONSTRUCTION_SITES, {
					filter : function(site) {
						return true;
					},
					"algorithm" : "dijkstra"
				});
				debug.log();
				
				if ( constructions.length > 0 ) {
					target = constructions[0];
				} else {
					debug = new Debug("find structures", 5);
				    var structures = creep.room.find(FIND_STRUCTURES, {
				        filter : function(s) {
				            return s.needsRepair();
				        }
				    });
				    
				    debug.log();
				    
				    if ( structures.length ) {
				    	target = _.min(structures, function(e) {
				    	    var p = (e.hits * 100 / e.hitsMax);
				    		return p;
				    	});
				    }
				    
				}
			}
			
			if ( target ) {
				// build / repair target
				creep.moveTo(target);
				if ( typeof target.progress == "number" ) {
					creep.build(target);
				} else {
				    creep.repair(target);
				}
				creep.target(target.id);
				return;
			}

		} else if ( creep.energy == 0 ) {
			
			var energyList = creep.room.find(FIND_DROPPED_ENERGY, {
				filter : function(e) {
					return ( e.energy > 40 && e.energy < 200 );
				}
			});
			
			if ( energyList.length ) {
				creep.moveTo(energy);
				creep.pickup(energy);
				return;
			}
			
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