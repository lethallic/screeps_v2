module.exports = {
	
	process : function(creep) {
		var creepModule = this.getRoleModule(creep);
		if ( creepModule ) {
			creepModule.run(creep);
		}
	},
			
	getRoleModule : function(creep) {
		try {
			var m = require("role_" + creep.memory.role);
			if ( typeof m !== 'undefined' ) {
				return m;
			}
		} catch ( e ) {
			// role module not found
		}
		return null;	
	}
	
};