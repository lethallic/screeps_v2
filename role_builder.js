module.exports = {
	
	body : [MOVE, MOVE, CARRY, CARRY, WORK],
	
	run : function(creep) {
		var target =this._getObject(creep.target());
		
		if ( target ) {
		    if ( (target.ticksToRegeneration || target.energy) && creep.energy == creep.energyCapacity ) {
		        target = null;
		    } else if ( creep.energy == 0 ) {
		        target = null;
		    }
		}
		
        if ( target == null ) {
            if ( creep.energy == 0 ) {
                var energy = creep.room.droppedEnergy();
                if ( energy.length ) {
                    target = energy[0];
                } else {
                    target = this._findSource(creep);
                }
            } else {
                target = this._findConstruction(creep);
            }
        }

		if ( target ) {
		    creep.moveTo(target);
		    console.log(creep, target)
		    if ( target.ticksToRegeneration ) {
		        // energy
		        creep.harvest(target);
		    } else if ( target.energy ) {
		        creep.pickup(target);
		    } else { //if ( target.progress && target.structureType ) {
		        // construction
		        creep.build(target);
		    }
		    creep.target(target.id);
		} else {
		    creep.target(null)
		}
	},
	
	_getObject : function(id) {
	    if ( id ) {
	        return Game.getObjectById(id);
	    }
	    return null;
	},
	
	_findSource : function(creep) {
        var sources = creep.room.sources();
        return creep.pos.findClosest(sources);
	},
	
	_findConstruction : function(creep) {
	    var constructions = creep.room.find(FIND_CONSTRUCTION_SITES);
	    return creep.pos.findClosest(constructions);
	}
	
};