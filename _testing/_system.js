var _debug = require("_debug.js");

var System = function() {};

_.extend(System.prototype, {
    gc : function() {
        for (var i in Memory.creeps) {
    		if (!Game.creeps[i]) {
    			delete Memory.creeps[i];
    		}
    	}
    
    	for (var i in Memory.flags) {
    		if (!Game.flags[i]) {
    			delete Memory.flags[i];
    		}
    	}
    },
    
    getDebug : function() {
        return Memory['_debug'] || false;
    },
    
    setDebug : function(debug) {
        Memory['_debug'] = debug
    },
    
    debug : function(name, minUsed) {
        return new _debug(name, minUsed);
    },
    
    debugOut : function(d) {
        if ( this.getDebug() && d ) {
            debug.log();
        }
    }
    
});



module.exports = new System();