var Debug = require("_debug");
module.exports = {
	
	body : [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, WORK, CARRY, CARRY, WORK],
	body_small : [MOVE, CARRY, WORK],
	
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
					return ( e.energy > 50 );
				}
			});
			
			if ( energyList.length ) {
				creep.moveTo(energyList[0]);
				creep.pickup(energyList[0]);
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
	},
	
	
	_doWork : function(creep) {
		var target = _getTarget(creep);
		var type = _getType(target);
		
		if ( energy == 0 ) {
			
		} else {
			
		}
		
		if ( target && creep.energy > 0 ) {
			if (!_needsWork(target)) {
				target = null;
			}
		} else {
			//  no energy
			var energy = _getEnergy(creep);
			if ( energy ) {
				target = energy;
			}
		}

		if ( !target ) {
			// find target;
		}
		
		if ( target ) {
			creep.moveTo(target);
			switch (_getType(target)) {
				case 'spawn':
					target.transferEnergy(creep);
					break;
					
				case 'energy':
					creep.pickup(target);
					break;
					
				case 'structure':
					creep.repair(target);
					break;
					
				case 'construction':
					creep.build(target);
					break;
			}
		}

	},
	
	_getTarget : function(creep) {
		if ( creep.target() ) {
			return Game.getObjectById(creep.target());
		}
		return null;
	},
	
	_needsWork : function(target) {
		if ( target.progress ) {
			return (target.progress < target.progressTotal);
		} else if ( target.hits ) {
			return (target.hits < target.hitsMax);
		}
		return false;
	},
	
	_getEnergy : function(creep) {
		var energy = this._findEnergy(creep);
		if ( energy ) {
			// set target, get energy
			creep.setTarget(energy.id)
			return true;
		} else {
			// goto spawn, get energy
			var spawn = creep.room.getSpawn();
			if ( spawn ) {
				creep.setTarget(spawn.id)
				return true;
			}
		}
		return false;
	},
	
	_findEnergy : function(creep) {
		var energy = _.filter(creep.room.droppedEnergy(), function(e) {
			return ( e.energy >= creep.energyCapacity );
		});
		
		if ( energy.length ) {
			return creep.pos.findClosest(energy);
		}
		
		return null;
	},
	
	_targetType : function(o) {
		if ( o.createCreep ) {
			return "spawn";
		} else if ( o.progress ) {
			return "construction";
		} else if ( o.hits ) {
			return "structure";
		} else if ( o.energy ) {
			return "energy";
		}
		return null;
	}
	
};