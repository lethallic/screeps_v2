var _Cache = {
    getCached : function(key, resultFunction) {
        if ( !this._cache[key] ) {
            this.cache[key] = resultFunction.call(this);
        }
        return this._cache[key];
    }
}

/**
 * Extend Room
 * -----------------------------------------------------------------------------
 */
_.extend(Room.prototype, _Cache);
_.extend(Room.prototype, {
    
    getCreeps : function() {
        return this.getCached("creeps", function(){
            return this.find(FIND_MY_CREEPS);
        });
    },
    
    getStructures : function() {
        return this.getCached("structures", function(){
            return _.filter(this.find(FIND_STRUCTURES), function(s) {
                return (s.my || s.structureType == STRUCUTRE_ROAD);
            })    
        });
    },
    
    getExtensions : function() {
        return this.getCached("extensions", function(){
            return _.filter(this.getStructures(), function(s){
                return s.structureType == STRUCTURE_EXTENSION;
            });          
        });
    },
    
    getSpawns : function() {
        return this.getCached("spawns", function(){
            return this.find(FIND_MY_SPAWNS);
        });
    }

});


/**
 * Extend Creep
 * -----------------------------------------------------------------------------
 */
_.extend(Creep.prototype, {
    
    _setMemory : function(key, value) {
        if ( !key ) return;
        if ( value ) {
            this.memory[key] = ( value.id ? value.id : value );
        } else {
            delete this.memory[key];
        }
    },
    
    _getMemory : function(key) {
        if ( this.memory[key] ) {
            return this.memory[key];
        }
        return null;
    },
    
    
    setRole : function(r) {
        this._setMemory('role', r);
    },
    
    getRole : function() {
        return this._getMemory('role');
    },
    
    setTarget : function(t) {
        this._setMemory('target', t);
    },
    
    getTarget : function() {
        var target = this._getMemory('target');
        if ( target ) {
            return Game.getObjectById(target);
        }
        return null;
    }
    
});