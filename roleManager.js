module.exports = {
	
	process : function(creep) {
		var role = creep.memory.role;
		if ( role ) {
			var creepModule = this.getRoleModule(role);
			if ( creepModule ) {
				creepModule.run(creep);
			}
		}
	},
			
	getRoleModule : function(role) {
		try {
			var m = require("role_" + role);
			if ( typeof m !== 'undefined' ) {
				return m;
			}
		} catch ( e ) {
			// role module not found
		}
		return null;	
	}
	
};