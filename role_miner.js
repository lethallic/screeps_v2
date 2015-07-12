var moveOptions = {
    'maxOps' : 1000,
    'heuristicWeight' : 1
};

module.exports = {
	
	body: [MOVE, WORK, WORK, WORK, WORK, WORK],
	body_small : [MOVE, WORK, WORK],
	
	run : function(creep) {
		if ( creep.target() ) {
			var target = Game.getObjectById(creep.target());
			if ( target ) {
				if ( !creep.pos.isNearTo(target) ) {
					creep.moveTo(target, moveOptions);
				}
				creep.harvest(target);
			}
		}
	}
		
}