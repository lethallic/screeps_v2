module.exports = {
	
	body : [MOVE], //, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK],
	
	run : function(creep) {
        if ( !this._healFighter(creep) ) {
            this._gotoFlag(creep);
        }
	},
	
	_healFighter : function(creep) {
	    var fighters = _.filter(creep.room.find(FIND_MY_CREEPS), function(c) {
            return ( c.memory.role == "fighter" );
        });
        
        var toHeal = _.sortBy(fighters, function(c) {
            return c.hits;
        });
        
        for ( var i in toHeal ) {
            var target = toHeal[i];
            
            if ( target && target.hits < target.hitsMax && target != creep ) {
                console.log("heal", target);
                creep.moveTo(target);
                creep.heal(target);
                return true;
            }    
        }
        console.log("not target found to heal");
        return false;
	},
	
	_gotoFlag : function(creep) {
	    var flag = _.find(Game.flags, function(f){
		    return ( flag.color == COLOR_RED );
		});
        
		if ( flag ) {
		    return (creep.moveTo(flag) == 0);
		}
		return false;
	}
    	
};