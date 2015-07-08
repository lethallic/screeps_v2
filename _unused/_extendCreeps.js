/**
 * ------------------------------
 * Creep
 * ------------------------------
 */
_.extend(Creep.prototype, {
    
    /**
     * Get / Set Target
     */
    target : function(newTarget) {
        if ( newTarget ) {
            if ( typeof newTarget == 'string' ) {
                this.memory.target = newTarget;
            } else if ( newTarget.id ) {
                this.memory.target = newTarget.id
            }
            return;
        }
    
        if ( this.memory.target ) {
            return Game.getObjectById(this.memory.target);
        }
        
        return null;
    },
    
    
    /**
     * Get / Set Role
     */
    role : function(newRole) {
        if ( newRole ) {
            this.memory.role = newRole;
        }
        return this.memory.role || null;
    },

    
    /**
     * Get / Set Action
     */
    action : function(newAction) {
        if ( newAction ) {
            this.memory.action = newAction;
        }
        return this.memory.action || null;    
    },
    
    
    /**
     * Work on Target with Action
     */
    work : function() {
        var target = this.target();
        var action = this.action();
        
        if ( target != null && action != null ) {
            if ( !this.pos.isNearTo(target) ) {
                this.moveTo(target);
            } else {
                switch (this.action()) {
                    case 'build':
                        this.build(target);
                        break;
                    
                    case 'repair':
                        this.repair(target);
                        break;
                        
                    case 'harvest':
                        this.harvest(target);
                        break;
                    
                    case 'upgrade':
                        this.upgradeController(target);
                        break;
                    
                    case 'transfer':
                        this.transferEnergy(target);
                        break;
                        
                    case 'pickup':
                        this.pickup(target);
                        break;
                    
                    case 'drop':
                        this.dropEnergy();
                        break;
                        
                    
                    // case 'attack':
                    //     break;
                        
                    // case 'heal':
                    //     break;
                    
                    default:
                        console.log("unimplemented action: " + action, target);
                }
            }
        }
    }
    
});


/**
 * ------------------------------
 * Room Object
 * ------------------------------
 */
_.extend(Room.prototype, {
    
	_getCached : function(key, func){
        this._cache = this._cache || {};
        
        if ( !this._cache[key] ) {
            this._cache[key] = func.call(this);
        }
        
        return this._cache[key];
    },
    
    sourcesEx : function() {
        return this._getCached("source", function(){
            var sources = _.filter(this.find(FIND_SOURCES), function(s){
                return (s.pos.findInRange(FIND_HOSTILE_CREEPS, 10).length == 0 && s.pos.findInRange(FIND_HOSTILE_STRUCTURES, 10).length == 0);
            });
            return sources;
        });
    }
    
    
});