module.exports = {
	
	this._modules = {},
	
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
		if ( typeof this._modules[role] == 'undefined' ) {
			this._modules[role] = this.loadModule(role);
		}
		return this._modules[role]
	},
	
	loadModule : function(role) {
		try {
			console.log("load module " + role);
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