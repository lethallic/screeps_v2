var config = {
	
	"miners" : {
		"max" : 2
	}
	
	"transporters" : {
		"max" : 6
	},
	
	"constructors" : {
		"max": 3
	}
	
};

module.exports = {
	
	_createCreep : function(room, roleManager, role, target) {
		var spawn = room.getSpawn();
		var mod = roleManager.getRoleModule(role);
		
		if ( spawn && mod ) {
			var name = role + "_" + Math.round(Math.random() * 1000);
			
			if ( spawn.canCreateCreep(mod.body, name) == 0 ) {
				console.log("building " + name + " [" + role + "] ...");
				var creep = spawn.createCreep(mod.body, name, {
					"role" : role,
					"target": target
				});			
			}
			
			return _.isString(creep);			
		}
		
		return false;
	},
	
	produce : function(room, roleManager) {
		var sources = room.sources();
		var transporters = room.getCreeps("transporter");
		
		// create one transporter first
		if ( transporters.length == 0 ) {
			this._createCreep(room, roleManager, "transporter");
			return;
		}
		
		// create a miner for each save resource
		for ( var s in sources ) {
			var source = sources[s];
			if ( !source.hasMiner(config.miners.max) ) {
				// create miners
				this._createCreep(room, roleManager, "miner", source.id);
				return;
			}
		}
		
		// create additional transporters, if count < config.transporters.max
		if ( room.getCreeps("transporter").length < config.transporters.max ) {
			this._createCreep(room, roleManager, "transporter");
			return;
		}
		
		// create constructors, if count < config.constructors.max
		if ( room.getCreeps("constructor").length < config.constructors.max ) {
			this._createCreep(room, roleManager, "constructor");
			return;
		}
		
	}
			
};