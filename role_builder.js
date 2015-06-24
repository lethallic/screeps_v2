module.exports = {
	
	body : [MOVE, MOVE, CARRY, CARRY, WORK],
	
	run : function(creep) {
		var target = _getObjectById(creep.target());
		
		if ( target ) {
		    if ( target.ticksToRegeneration && creep.energy == creep.energyCapacity ) {
		        
		    } else if ( creep.energy == 0 ) {
		        target = null;
		    }
		}
		
        if ( target == null ) {
            if ( creep.energy == 0 ) {
                target = this._findSource(creep);
            } else {
                target = this._findConstruction(creep);
            }
        }

		if ( target ) {
		    creep.moveTo(target);
		    
		    if (  target.ticksToRegeneration ) {
		        // energy
		        creep.harvest(target);
		    } else if ( target.progress && target.structureType ) {
		        // construction
		        creep.build(target);
		    }
		    
		    creep.target(target);
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
        var sources = room.sources();
        return creep.pos.findClosest(sources);
	},
	
	_findConstruction : function(creep) {
	    var constructions = creep.room.find(FIND_CONSTRUCTION_SITES);
	    return creep.pos.findClosest(constructions);
	}
	
};