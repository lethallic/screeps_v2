var Debug = require("_debug");
var extend = require("extend");

function recycleMemory() {
	for (var i in Memory.creeps) {
        if (!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
    
    for ( var i in Memory.flags ) {
    	if ( !Game.flags[i] ) {
    		delete Memory.flags[i];
    	}
    }
    
}

module.exports = (function() {
	// var debug = require("_debug")("_init.js");
	
	recycleMemory();
		
	extend(Creep.prototype, {
		"role" : function(newRole) {
			if ( newRole ) {
				this.memory.role = newRole;
			}
			return this.memory.role;
		},
		"target" : function(newTarget) {
			if ( newTarget ) {
				this.memory.target = newTarget;
			}
			return this.memory.target;
		},
		"work" : function() {
			var target = Game.getObjectById(this.target());
			if ( target ) {
				
								
			}
			return false;
		}
	});
	
	
	
	extend(Room.prototype, {
		_droppedEnergy : null,
		_spawn : null,
		_extensions : null,
		
		newSpawn : function() {
			if ( this._spawn == null ) {
				var spawns = this.find(FIND_MY_SPAWNS);
				if( spawns.length ) {
					this._spawn = spawns[0];
				}
			}				
			return this._spawn;
		},
		
		getSpawn : function() {
			if ( this._spawn == null ) {
				var spawns = this.find(FIND_MY_STRUCTURES, {
    		        filter : function(s) {
    		            return (s.structureType == STRUCTURE_SPAWN);
    		        }
		        })
				if( spawns.length ) {
					this._spawn = spawns[0];
				}
			}				
			return this._spawn;
		},
		
		sources : function() {
			return this.find(FIND_SOURCES, {
				filter : function(source) {
					return !source.defended();
				}
			});
		},
		
		getCreeps : function(role) {
			return this.find(FIND_MY_CREEPS, {
				filter : function(c) {
					return (c.role() === role);
				}				
			});
		},
		
		creepsByTarget : function(targetId) {
			return this.find(FIND_MY_CREEPS, {
				filter : function(c) {
					return (c.target() === targetId);	
				}
			});
		},
		
		droppedEnergy : function() {
			if ( this._droppedEnergy == null ) {
				var debug = new Debug("Room.droppedEnergy()", 1);
				this._droppedEnergy = this.find(FIND_DROPPED_ENERGY, {
					filter: function(e) {
						return ( e.energy >= 100 );
					}
				});
				debug.log();
			}
			return this._droppedEnergy;
		},
		
		extensions : function() {
			if ( this._extensions == null ) {
				this._extensions = this.find(FIND_MY_STRUCTURES, {
					filter : function(s) {
						return (s.structureType == STRUCTURE_EXTENSION);
					}
				});
			}
			return this._extensions;
		},
		
		emptyExtensions : function() {
			return _.filter(this.extensions(), function(e){
				return (e.energy < e.energyCapacity);
			});
		},
		
		maxEnergy : function() {
			var spawn = this.getSpawn();
			if ( spawn ) {
				return 300 + (this.extensions().length * 50);
			}
			return 0;
		}

	});
	
	extend(ConstructionSite.prototype, {
		_type : "construction",
		hasWorker : function() {
			return (this.room.creepsByTarget(this.id) > 0);
		}
	});
	
	extend(Source.prototype, {
		defended : function() {
			var targets = this.pos.findInRange(FIND_HOSTILE_CREEPS, 10);
            if ( targets.length ) {
                return true;
            }
            
            targets =  this.pos.findInRange(FIND_HOSTILE_STRUCTURES, 10);
            if ( targets.length ) {
                return true;
            }

            return false;		
		},
		hasMiner : function(max) {
			var maxMiners = max || 1;
			return !(this.room.creepsByTarget(this.id).length < maxMiners);
		}
	});
	
	extend(Spawn.prototype, {
		needsRepair : function(name) {
            return this.hits < this.hitsMax;
        }
	});
	
	extend(Structure.prototype, {
		_type : "structure",
		needsRepair : function(name) {
			if ( this.structureType == STRUCTURE_RAMPART ) {
				return this.hits < 1000000;
			}
            return this.hits < this.hitsMax;
        }
	});
	
	// debug.log();
	
	return true;
})();