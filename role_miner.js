module.exports = {
	
	body : [MOVE, WORK], //, WORK, WORK, WORK, WORK],
	
	run : function(creep) {
		if ( creep.target() ) {
			var target = Game.getObjectById(creep.target());
			if ( target ) {
				creep.moveTo(target);
				creep.harvest(target);
			}
		}
	}
		
}