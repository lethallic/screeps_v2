var utils = require("_utils");

module.exports = {
	
	_modules : {},
	
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
		if ( !this._modules[role] ) {
		// if ( typeof(this._modules[role]) !== 'object' ) {
			this._modules[role] = this.loadModule(role);
		}
		return this._modules[role];
	},
	
	loadModule : function(role) {
		try {
			var m = require("role_" + role);
			if ( typeof m !== 'undefined' ) {
				// return new utils.debugObject(m);
				return m;
			}
		} catch ( e ) {
			// role module not found
			console.log(e);
		}
		return null;
	}
	
};