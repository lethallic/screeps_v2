var Debug = require("_debug");

var _debugMinUsed = 10;

module.exports = {
    
    extend : function( proto , options ) {
    	for ( var key in options ) {
    		proto[key] = options[key];
    	}
    },
    
    debug : function(name, minUsed) {
        return new Debug(name, (minUsed || _debugMinUsed));
    },
    
    log : function(d) {
        if ( this.getDebug() && d ) {
            d.log();
        }
    },
    
    getDebug : function() {
        return Memory['_debug'] || false;
    },
    
    setDebug : function(debug) {
        Memory['_debug'] = debug
    },
    
};