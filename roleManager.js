module.exports = {
	
	_modules : {},
	
	process : function(creep) {
		
		var role = creep.memory.role;
		if ( role ) {
			var creepModule = this.getRoleModule(role);
			if ( creepModule ) {
				var start = Game.getUsedCpu();
				creepModule.run(creep);
				
				var used = (Game.getUsedCpu() - start);
				if ( used > 2) {
					console.log("DEBUG - " + role, used);
				}
			}
		}
	},
				
	getRoleModule : function(role) {
		if ( typeof(this._modules[role]) !== 'object' ) {
			this._modules[role] = this.loadModule(role);
		}
		return this._modules[role];
	},
	
	loadModule : function(role) {
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