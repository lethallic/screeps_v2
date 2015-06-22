module.exports = {
	
	body : [TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK],
	
	run : function(creep) {
        if ( !this._attackEnemy(creep) ){
            this._gotoFlag(creep);
        }
	},
	
	_attackEnemy : function(creep) {
	    var enemy = this.findEnemy(creep);
        if ( enemy ) {
            creep.moveTo(enemy);
            creep.attack(enemy);
            return true;
        }
	    return false;
	},
	
	findEnemy : function(creep) {
	    _.find(creep.room.find(FIND_HOSTILE_CREEPS), function(c){
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