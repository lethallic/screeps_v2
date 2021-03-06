var Debug = require("_debug");
var extend = require("extend");

var RANGE_TO_SOURCE = 4;

function recycleMemory() {
	for (var i in Memory.creeps) {
		if (!Game.creeps[i]) {
			delete Memory.creeps[i];
		}
	}

	for (var i in Memory.flags) {
		if (!Game.flags[i]) {
			delete Memory.flags[i];
		}
	}

}

var Cache = {
	_getCached: function(key, result) {
		if (!this._cache) this._cache = {};
		var key = key + "_" + (this.id || this.name);

		if (!this._cache[key]) {
			this._cache[key] = result.call(this);
		}

		return this._cache[key];
	}
};


module.exports = (function() {
	recycleMemory();

	extend(Creep.prototype, {
		"role": function(newRole) {
			if (newRole) {
				this.memory.role = newRole;
			}
			return this.memory.role;
		},
		"target": function(newTarget) {
			if ( typeof newTarget != 'undefined' ) {
				this.memory.target = newTarget;
			}
			return this.memory.target;
		},
		"work": function() {
			var target = Game.getObjectById(this.target());
			if (target) {


			}
			return false;
		}
	});



	extend(Room.prototype, Cache);
	extend(Room.prototype, {
		getLevel : function() {
			if ( this.controller && this.controller.my ) {
				return this.controller.level;
			}
			return null;
		},
		
		getFlags: function() {
			return this._getCached("flags", function() {
				return this.find(FIND_FLAGS);
			})
		},

		newSpawn: function() {
			if (this._spawn == null) {
				var spawns = this.find(FIND_MY_SPAWNS);
				if (spawns.length) {
					this._spawn = spawns[0];
				}
			}
			return this._spawn;
		},

		getSpawn: function() {
			return this._getCached("spawn", function() {
				for ( var s in Game.spawns ) {
					var spawn = Game.spawns[s];
					if ( spawn.room.name == this.name ) {
						return spawn;
					}
				}
				
				// var spawns = this.find(FIND_MY_SPAWNS);
				// if (spawns.length) {
				// 	return spawns[0];
				// }
				return null;
			})
		},

		sources: function() {
			// var sources = this._getCached("sources", function() {
			// 	return this.find(FIND_SOURCES, {
			// 		filter: function(source) {
			// 			return !source.defended();
			// 		}
			// 	});
			// });

			// return sources;

			var arrSources = [];

			if (!this.memory['sources']) {
				var sources = this.find(FIND_SOURCES);
				for (var s in sources) {
					arrSources.push(sources[s].id);
				}
				this.memory['sources'] = arrSources;
			}

			return this._getCached("source", function() {
				var result = [];
				if (this.memory['sources']) {
					for (var i in this.memory['sources']) {
						var sourceId = this.memory['sources'][i];
						
						var s = Game.getObjectById(sourceId)
						if ( !s.defended() ) {
							result.push(s);
						}
					}
				}
				return result;
			});
		},

		getCreeps: function(role) {
			var creeps = this._getCached("creeps", function() {
				return this.find(FIND_MY_CREEPS);
			})

			if (role && role !== "") {
				return _.filter(creeps, function(c) {
					return (c.role() === role);
				})
			}

			return creeps;
		},

		getStructures: function() {
			return this._getCached("structures", function() {
				return _.filter(this.find(FIND_STRUCTURES), function(s) {
					return (s.my || s.structureType == STRUCTURE_ROAD || s.structureType == STRUCTURE_WALL);
				});
			})
		},

		getConstructionSites: function() {
			return this._getCached("constructionSites", function() {
				return this.find(FIND_CONSTRUCTION_SITES);
			});
		},
		
		getLinks: function() {
			return _.filter(this.getStructures(), { 'structureType' : STRUCTURE_LINK });
		},

		creepsByTarget: function(targetId, role) {
			return _.filter(this.getCreeps(role), function(c) {
				return (c.target() === targetId);
			});
		},

		droppedEnergy: function() {
			return this._getCached("droppedEnergy", function() {
				return this.find(FIND_DROPPED_ENERGY, {
					filter: function(e) {
						return (e.energy >= 100);
					}
				});
			});
		},

		extensions: function() {
			return this._getCached("extensions", function() {
				return _.filter(this.getStructures(), {
					'structureType': STRUCTURE_EXTENSION
				});

				// return this.find(FIND_MY_STRUCTURES, {
				// 	filter: function(s) {
				// 		return (s.structureType == STRUCTURE_EXTENSION);
				// 	}
				// });
			});
		},

		emptyExtensions: function() {
			return _.filter(this.extensions(), function(e) {
				return (e.energy < e.energyCapacity);
			});
		},

		maxEnergy: function() {
			var spawn = this.getSpawn();
			if (spawn) {
				return 300 + (this.extensions().length * 50);
			}
			return 0;
		},
		
		getSenderLinks: function() {
	        var sources = this.sources();
	        return _.filter(this.getLinks(), function(link) {
	            for (var s in sources) {
	                if (link.pos.inRangeTo(sources[s], RANGE_TO_SOURCE)) {
	                    return true;
	                }
	            }
	            return false;
	        })
	    }

	});

	extend(ConstructionSite.prototype, {
		_type: "construction",
		hasWorker: function() {
			return (this.room.creepsByTarget(this.id) > 0);
		}
	});

	extend(Source.prototype, {
		defended: function() {
			var targets = this.pos.findInRange(FIND_HOSTILE_CREEPS, 5);
			if (targets.length) {
				return true;
			}

			targets = this.pos.findInRange(FIND_HOSTILE_STRUCTURES, 5);
			if (targets.length) {
				return true;
			}

			return false;
		},
		hasMiner: function(max) {
			var maxMiners = max || 1;
			return !(this.room.creepsByTarget(this.id, "miner").length < maxMiners);
		}
	});

	extend(Spawn.prototype, {
		needsRepair: function(name) {
			return this.hits < this.hitsMax;
		}
	});


	extend(Structure.prototype, Cache);
	extend(Structure.prototype, {
		_type: "structure",
		needsRepair: function(name) {
			if (this.structureType == STRUCTURE_RAMPART || this.structureType == STRUCTURE_WALL) {
				return this.hits < 1000000;
			}
			return this.hits < this.hitsMax;
		},

		getFreeFields: function() {
			return this._getCached("freeFields", function() {
				if (!this.room.memory.maxUpgraders) {
					var pos = this.pos;
					var count = 0;

					for (var x = -1; x < 2; x++) {
						for (var y = -1; y < 2; y++) {
							var terrain = this.room.lookForAt('terrain', pos.x + x, pos.y + y);
							if (terrain != 'wall') {
								count++;
							}
						}
					}

					this.room.memory.maxUpgraders = count;
				}

				return this.room.memory.maxUpgraders;
			});
		}
	});

	return true;
})();