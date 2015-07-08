var Debug = require("_debug");

var _debugMinUsed = 10;

var _utils = {
    
    extend : function( proto , options ) {
    	for ( var key in options ) {
    		proto[key] = options[key];
    	}
    },
    
    debug : function(name, minUsed) {
        return new Debug(name, (minUsed || _debugMinUsed));
    },
    
    log : function(d, args) {
        if ( this.getDebug() && d ) {
            if ( d.log ) {
                console.log(d.name(), d.duration(), args);
            } else {
                console.log(d);
            }
        }
    },
    
    getDebug : function() {
        return Memory['_debug'] || false;
    },
    
    setDebug : function(debug) {
        Memory['_debug'] = debug
    },
    
    debugObject : function(object) {
        var proxy = {};
        
        for ( var m in object ) {
            var member = object[m];
            
            if ( typeof member === 'function' ) {
                proxy[m] = function() {
                    var debug = _utils.debug(object.toString() + "." + m);
                    member.apply(proxy, arguments);
                    _utils.log(debug, arguments);
                }
            } else {
                proxy[m] = member;
            }
        }
        
        return proxy;
    }

};

module.exports = _utils;