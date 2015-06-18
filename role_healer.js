module.exports = {
	
	body : [MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK],
	
	run : function(creep) {
		var flag = _.find(Game.flags, function(f){
		    return ( flag.color == COLOR_RED );
		});
        
        
        if ( creep.room.find(FIND_HOSTILE_CREEPS) ) {
            
        }
        
        		
		
		if ( flag ) {
		    creep.moveTo(flag);
		}
	}
	
};