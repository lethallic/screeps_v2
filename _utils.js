var Debug = require("_debug");

module.exports = {
    
    extend : function( proto , options ) {
    	for ( var key in options ) {
    		proto[key] = options[key];
    	}
    },
    
    debug : function(name, minUsed) {
        return new Debug(name, minUsed);
    },
    
    log : function(d) {
        console.log(this.getDebug(), d);
        
        if ( this.getDebug() && d ) {
            d.log;
        }
    },
    
    getDebug : function() {
        return Memory['_debug'] || false;
    },
    
    setDebug : function(debug) {
        Memory['_debug'] = debug
    },
    
};