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
		}
	});
	
	
	var _droppedEnergy = null;
	
	extend(Room.prototype, {
		newSpawn : function() {
			var spawns = this.find(FIND_MY_SPAWNS);
			if( spawns.length ) {
				return spawns[0];
			}
								
			return null;
		},
		
		getSpawn : function() {
			var spawns = this.find(FIND_MY_SPAWNS);
			if ( spawns.length ) {
				return spawns[0];
			}
			return null;
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
			var debug = new Debug("Room.droppedEnergy()", 2);
			var e = this.find(FIND_DROPPED_ENERGY, {
				filter: function(e) {
					return ( e.energy >= 100 );
				}
			});
			debug.log();
			return e;
		},
		
		energy : (function(){ return droppedEnergy(); })()

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
            return this.hits < this.hitsMax / 2;
        }
	});
	
	extend(Structure.prototype, {
		_type : "structure",
		needsRepair : function(name) {
            return this.hits < this.hitsMax / 2;
        }
	});
	
	// debug.log();
	
	return true;
})();