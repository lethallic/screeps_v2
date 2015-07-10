var Debug = require("_debug")

module.exports = {
	
	body : [MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY],
	body_small : [MOVE, CARRY],
	
	run : function(creep) {
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
			var energy = null;
		
			var energyList = _.filter(creep.room.droppedEnergy(), function(e) {
		    	return e.pos.inRangeTo(miner, 2);
			});	
			
			if ( energyList.length ) {
				energy = energyList[0];
			}
			
			if ( typeof energy !== "undefined" ) {
				creep.moveTo(energy);
				creep.pickup(energy);
			}
			
		} else {
			var debug = new Debug(creep + "FIND EXTENSION", 5);
			
			var extension = null;
			var emptyExtensions = creep.room.emptyExtensions();
			if ( emptyExtensions.length ) {
				extension = creep.pos.findClosest(emptyExtensions);
			}
			
			var links = creep.room.getSenderLinks();
			if ( links.length ) {
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
			}
			

			// debug.log();
			
			if ( extension ) {
				debug = new Debug(creep + "DO WORK", 5);
				creep.moveTo(extension);
				creep.transferEnergy(extension);
				// debug.log();
				
				return;
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
	}
	
};