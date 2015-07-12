var utils = require("_utils");

module.exports = {
	
	_modules : {},
	
	process : function(creep) {
		if ( creep.fatigue > 0 ) return;
		
		
		var role = creep.memory.role;
		if ( role ) {
			var creepModule = this.getRoleModule(role);
			if ( typeof creepModule !== 'undefined' && creepModule != null ) {
				var debug = utils.debug("RoleManager.process(" + creep + ")");
				creepModule.run(creep);
				utils.log(debug);
			}
			
		}
	},
				
	getRoleModule : function(role) {
	    if ( typeof(this._modules[role]) !== 'object' ) {
	        var module = this.loadModule(role);
			this._modules[role] = module;
		}
		
		return this._modules[role] || null;
	},
	
	loadModule : function(role) {
		try {
			var m = require("role_" + role);
			if ( typeof m !== 'undefined' ) {
				return m;
			}
		} catch ( e ) {
			// role module not found
			console.log(e);
		}
		return null;
	}
	
};