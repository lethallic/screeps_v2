var config = {
	
	"miners" : {
		"max" : 2
	},
	
	"transporters" : {
		"max" : 1
	},
	
	"constructors" : {
		"max": 2//3
	},
	
	"upgraders" : {
		"max" : 3
	},
	
	"builders" : {
		"max" : 3
	}
	
};

module.exports = {
	_buildSmall : 600,
	
	_createCreep : function(room, roleManager, role, target) {
		var spawn = room.getSpawn();
		var mod = roleManager.getRoleModule(role);
		
		if ( spawn && mod ) {
			var name = role + "_" + Math.round(Math.random() * 1000);
			
			var body = mod.body;
			if ( room.maxEnergy() < _buildSmall && mod.body_small ) {
				body = mod.body_small;
			}
					
			if ( spawn.canCreateCreep(body, name) == 0 ) {
				console.log("building " + name + " [" + role + "] ...");
				var creep = spawn.createCreep(body, name, {
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
		
		if ( room.maxEnergy() < 500 ) {
			// just build workers
			var builders = room.getCreeps("builder");
			
			if ( builders.length < config.builders.max ) {
				this._createCreep(room, roleManager, "builder");
			}

			return;
		}
		
		
		// create one transporter first
		var transporters = room.getCreeps("transporter");
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
		var maxTransporters = config.transporters.max * room.getCreeps("miner").length;
		if ( room.getCreeps("transporter").length < maxTransporters ) {
			this._createCreep(room, roleManager, "transporter");
			return;
		}
		
		// create upgrader, if count < config.upgraders.max
		if ( room.getCreeps("upgrader").length < config.upgraders.max ) {
			this._createCreep(room, roleManager, "upgrader");
			return;
		}
		
		
		// create constructors, if count < config.constructors.max
		if ( room.getCreeps("constructor").length < config.constructors.max ) {
			this._createCreep(room, roleManager, "constructor");
			return;
		}
		
	},
	
	buildDefence : function(spawn, roleManager) {
		// build defence		
		var defence = ["fighter", "healer"];
		var maxUnits = 1;
		
		for ( var d in defence ) {
			var role = defence[d];
			
			var creeps = _.filter(Game.creeps, function(c){
				return c.memory.role == role;
			});
			
			if ( creeps.length < maxUnits ) {
				this._createCreep(spawn.room, roleManager, role);
			}
		}
	}
			
};