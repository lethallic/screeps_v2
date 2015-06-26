module.exports = {
	
	// body : [TOUGH, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK],
	
	body : [TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK],
	
	run : function(creep) {
        if ( !this._attackEnemy(creep) ){
            this._gotoFlag(creep);
        }
	},
	
	_attackEnemy : function(creep) {
	    var enemy = this.findEnemy(creep);
        if ( enemy ) {
            if ( creep.rangedAttack(enemy) != 0 ) {
                creep.moveTo(enemy);
            }
            return true;
        }
	    return false;
	},
	
	findEnemy : function(creep) {
	   return  _.find(creep.room.find(FIND_HOSTILE_CREEPS), function(c){
	        return ( c.owner.username !== 'Source Keeper' );
		});
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