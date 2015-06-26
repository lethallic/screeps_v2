module.exports = {
	
	body : [TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, HEAL],
	
	run : function(creep) {
        if ( !this._healFighter(creep) ) {
            this._gotoFlag(creep);
        }
	},
	
	_healFighter : function(creep) {
	    var fighters = _.filter(creep.room.find(FIND_MY_CREEPS), function(c) {
	        if ( c != creep ) {
                return (( c.memory.role == "fighter" || c.memory.role == "healer" ) && c.hits < c.hitsMax);
	        }
            return false;
        });
        var toHeal = _.sortBy(fighters, function(c) {
            return c.hits;
        });
        
        if ( toHeal.length < 1 ) {
            toHeal = _.filter(creep.room.find(FIND_MY_CREEPS), function(c){
                return c.hits < c.hitsMax;
            })
        }
        
        for ( var i in toHeal ) {
            var target = toHeal[i];
            
            if ( target && target.hits < target.hitsMax && target != creep ) {
                if ( creep.rangedHeal(target) != 0 ) {
                    creep.moveTo(target);
                }
                return true;
            }    
        }
        return false;
	},
	
	_gotoFlag : function(creep) {
	    var flag = _.find(Game.flags, function(f){
		    return ( f.color == COLOR_RED );
		});
        
		if ( flag ) {
		    return (creep.moveTo(flag) == 0);
		}
		return false;
	}
    	
};