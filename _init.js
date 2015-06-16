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
	recycleMemory();
		
	extend(Game.prototype, {
		creepsByTarget : function(targetId) {
			return _.find(this.creeps, function(c){
				return (c.target() === targetId);
			});
		}
	});
	
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
	
	extend(Room.prototype, {
		newSpawn : function() {
										
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
					return !sources.defended;
				}
			});
		},
		
		getCreeps : function(role) {
			return this.find(FIND_MY_CREEPS, {
				filter : function(c) {
					return (c.role() === role);
				}				
			});
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
		hasMiner : function() {
			return (Game.creepsByTarget(this.id) > 0);
		}
	});
	
	extend(Spawn.prototype, {
		needsRepair : function(name) {
            return this.hits < this.hitsMax / 2;
        }
	});
	
	extend(Structure.prototype, {
		needsRepair : function(name) {
            return this.hits < this.hitsMax / 2;
        }
	});
	
	return true;
})();