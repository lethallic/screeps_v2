var utils = require("_utils");

module.exports = {

	body: [MOVE, MOVE, CARRY, CARRY, WORK],

	run: function(creep) {
		var target = this._getObject(creep.target());

		if (target) {
			if ((target.ticksToRegeneration || target.energy) && creep.energy == creep.energyCapacity) {
				target = null;
			}
			else if (creep.energy == 0) {
				target = null;
			}
		}

		if (target == null) {
			if (creep.energy == 0) {
				var energy = creep.room.droppedEnergy();
				if (energy.length) {
					target = energy[0];
				}
				else {
					var source = this._findSource(creep);
					if ( source ) {
						target = source;
					}
				}
			}

			if (target == null) {
				var spawn = creep.room.getSpawn();
				if (spawn) {
					if (spawn.energy < spawn.energyCapacity) {
						target = spawn;
					}

					if (target == null) {
						var extensions = creep.room.emptyExtensions();
						if (extensions.length) {
							target = extensions[0];
						}
					}

				}
			}

			if (target == null) {
				target = this._findConstruction(creep);
			}

			if (target == null) {
				target = creep.room.controller;
			}
		}

		if (target) {
			creep.moveTo(target);
			if (target.hits && target.structureType && (target.structureType == STRUCTURE_SPAWN || target.structureType == STRUCTURE_EXTENSION)) {
				creep.transferEnergy(target);
				creep.target(null);
				return;
			}
			else if (target.ticksToRegeneration) {
				// energy
				creep.harvest(target);
			}
			else if (target.energy) {
				creep.pickup(target);
			}
			else if (target.level) {
				creep.upgradeController(target)
			}
			else { //if ( target.progress && target.structureType ) {
				// construction
				creep.build(target);
			}
			creep.target(target.id);
		}
		else {
			creep.target(null)
		}
	},

	_getObject: function(id) {
		if (id) {
			return Game.getObjectById(id);
		}
		return null;
	},

	_findSource: function(creep) {
		var sources = _.filter(creep.room.sources(), function(s){
			return !source.hasMiner(1);
		});
		
		if ( sources.length ) {
			return utils.getTarget(creep, source);
		}
		
		return null;
		
		// var sources = creep.room.sources();
		// // utils.log(debug);

		// if (sources.length) {
		// 	var debug = utils.debug(creep + " find sources");
		// 	var source = utils.getTarget(creep, sources);
		// 	// var source = creep.pos.findClosest(sources, {
		// 	// 	"algorithm": "dijkstra" //"astar"
		// 	// });
		// 	// utils.log(debug);
		// 	return source;
		// }
		// return null;
	},

	_findConstruction: function(creep) {
		var debug = utils.debug(creep + " find constructions");
		var constructions = creep.room.getConstructionSites();
		// utils.log(debug);

		if (constructions.length) {
			debug = utils.debug(creep + " find nearest construction");
			var c = utils.getTarget(creep, constructions);
			// creep.pos.findClosest(constructions, {
			// 	"algorithm": "dijkstra" // astar
			// });
			// utils.log(debug);
			return c;
		}
		return null;
	},

};