var Debug = require("_debug");
module.exports = {
	
	body : [MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, WORK],
	
	run : function(creep) {
		var debug;
		
		
		if ( creep.energy > 0 ) {
			var target = null;
			
			if ( typeof creep.target() !== "undefined" ) {
				// creep has current target
				debug = new Debug("check target", 2);
				
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
				debug = new Debug("find constructions", 2);
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
					debug = new Debug("find structures", 2);
				    var structures = creep.room.find(FIND_STRUCTURES, {
				        filter : function(s) {
				            return s.needsRepair();
				        },
				        "algorithm" : "dijkstra"
				    });
				    debug.log();
				    
				    if ( structures.length ) {
				        target = structures[0];
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
			
			var controller = creep.room.controller;
			if ( controller && controller.my ) {
				creep.moveTo(controller);
				creep.upgradeController(controller)
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