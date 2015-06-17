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
		console.log(role, typeof this._modules[role]);
		
		if ( !this._modules[role] ) {
			this._modules[role] = this.loadModule(role);
		}
		
		return this._modules[role] || null;
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