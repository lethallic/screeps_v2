var Debug = require("_debug")

module.exports = {
	
	body : [MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY],
	body_small : [MOVE, CARRY],
	
	_run : function(creep) {
		this.applyMiner(creep);
		
		var minerId = creep.memory.miner || null;
		var miner = Game.getObjectById(minerId);
		
		var flags = _.filter(creep.room.getFlags(), function(f) {
			return f.color == COLOR_ORANGE;
		});
		
		if ( flags.length ) {
			creep.moveTo(flags[0]);
			return;
		}
		
		if ( creep.energy == 0 && miner != null ) { // < creep.energyCapacity ) {
			var energy = _.filter(creep.room.droppedEnergy(), function(e) {
		    	return e.pos.inRangeTo(miner, 2);
			});	
			
			if ( energy.length ) {
				creep.moveTo(energy[0]);
				creep.pickup(energy[0]);
			} else {
				creep.moveTo(miner);
			}
		} else {
			var debug = new Debug(creep + "FIND EXTENSION", 5);
			
			var extension = null;
			var emptyExtensions = creep.room.emptyExtensions();
			if ( emptyExtensions.length ) {
				extension = creep.pos.findClosestByRange(emptyExtensions);
			}
			var links = creep.room.getSenderLinks();
			
			// debug.log();
			
			if ( extension ) {
				creep.moveTo(extension);
				creep.transferEnergy(extension);
				return;
			} else if ( links.length ) {
				for ( var l in links ) {
					var link = links[l];
					if ( link.energy < link.energyCapacity ) {
						if ( creep.pos.inRangeTo(link, 10) ) {
							creep.moveTo(link);
							creep.transferEnergy(link);
							return;
						}
					}
				}
			} else {
				debug = new Debug(creep + "FIND SPAWN", 5);
				var spawn = creep.room.getSpawn();
				if ( spawn && spawn.energy < spawn.energyCapacity ) {
					creep.moveTo(spawn);
					creep.transferEnergy(spawn);
					return;
				}
				// debug.log();
				
				var upgrader = creep.room.getCreeps("upgrader");
				if ( upgrader.length ) {
					creep.moveTo(upgrader[0]);
					if ( upgrader.energy < upgrader.energyCapacity - 10 ) {
						creep.transferEnergy(upgrader[0]);
					} else if ( creep.pos.isNearTo(upgrader[0]) ) {
						creep.dropEnergy();
					}
				}
			}
		}
	},
	
	applyMiner : function(creep) {
		var minerId = creep.memory.minder;
		var miner = null;
		
		if ( minerId && minerId !== "" ) {
			// check, if miner exists
			if ( Game.getObjectById(minerId) != null) {
				return
			}
		};

		var transporters = creep.room.getCreeps("transporter");
		var miners = creep.room.getCreeps("miner");
			
		var perMiner = transporters.length / miners.length;
			
			
		for ( var m in miners ) {
			var miner = miners[m];
			
			var tm = _.filter(transporters, function(t){
				return (t.memory.miner == miner.id);
			});
			
			if ( tm.length < perMiner ) {
				creep.memory.miner = miner.id;
			}
		}
	},
	
	run : function(creep) {
		this.applyMiner(creep);
		if ( creep.energy == 0 ) {
			this._gotoMiner(creep);
		} else {
			// transfer energy
			this._transferEnergy(creep);
		}
	},
	
	
	_gotoMiner : function (creep) {
		var miner = Game.getObjectById(creep.memory.miner || null);
		
		if ( miner != null ) {
			var energy = _.filter(creep.room.droppedEnergy(), function(e) {
			   	return e.pos.inRangeTo(miner, 2);
			});	
				
			if ( energy.length ) {
				creep.moveTo(energy[0]);
				creep.pickup(energy[0]);
			} else {
				creep.moveTo(miner);
			}
			
			return true;
		}
		
		return false;
	},
	
	_transferEnergy : function(creep) {
		
		var target = Game.getObjectById(creep.target());
		if ( target == null ) {
			target = this._findTarget(creep);
		}
		
		
		if ( target ) {
			var move = false;
			
			if ( target.structureType ) {
				move = (creep.transferEnergy(target) == OK);
			} else if ( creep.pos.isNearTo(target) ) {
				creep.dropEnergy();
				move = false;
			}

			if ( move ) {
				creep.moveTo(target);
				creep.target(target.id);
			} else {
				creep.target(null);
			}
		}
		
	},
	
	_findTarget : function(creep) {
		var room = creep.room;
		
		
		// find empty extension		
		var emptyExtensions = _.filter(room.emptyExtensions(), function(e) {
			return (room.creepsByTarget(e.id, "transporter").length == 0);
		});
		if ( emptyExtensions.length ) {
			return creep.pos.findClosestByRange(emptyExtensions);
		}
		
		// find link
		var links = creep.room.getSenderLinks();
		if ( links.length ) {
			for ( var l in links ) {
				var link = links[l];
				if ( link.energy < link.energyCapacity ) {
					if ( creep.pos.inRangeTo(link, 10) ) {
						return link;
					}
				}
			}
		}
		
		// find spawn
		var spawn = creep.room.getSpawn();
		if ( spawn && spawn.energy < spawn.energyCapacity ) {
			return spawn;
		}
		
		// find upgrader
		var upgrader = creep.room.getCreeps("upgrader");
		if ( upgrader.length ) {
			return upgrader[0];
		}
		
		return null;
	}
	
};