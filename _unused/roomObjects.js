module.exports = function(room) {
    
    var _structures = room.find(FIND_STRUCTURES, {
        filter : function(s) {
            return ( s.my || s.structureType == STRUCTURE_ROAD );
        }
    });
    
    var _sources = room.find(FIND_SOURCES);
    var _creeps = room.find(FIND_MY_CREEPS);
    var _droppedEnergy = room.find(FIND_DROPPED_ENERGY);
    var _constructionSites = room.find(FIND_CONSTRUCTION_SITES);
    
    return {
        
        allStructures : function(filter) {
            if ( typeof filter == 'function' ) {
                return _.filter(_structures, filter);
            }
            return _structures;
        },
        
        spawns : function() {
          return this.allStructures(function(s) {
              return ( s.structureType == STRUCTURE_SPAWN );
          })  
        },

        extensions : function() {
            return this.allStructures(function(s) {
                return ( s.my && s.structureType == STRUCTURE_EXTENSION );
            });
        },
        
        emptyExtensions : function() {
            return _.filter(this.extensions(), function(s){
                return (s.energy < s.energyCapacity);
            });
        },
        
        roads : function(all) {
            all = all || false;
            return _.filter(_structures, function(s){
                var result = ( s.structureType == STRUCTURE_ROAD );
                if ( result && !all ) {
                    return s.needsRepair();
                }
                return result;
            });
        },
        
        droppedEnergy : function() {
            return _droppedEnergy;
        },
        
        constructionSites : function() {
            return _constructionSites;
        },
        
        creeps : function(role) {
            if ( role )  {
                return _.filter(_creeps, function(c) {
                    return (c.memory.role == c);
                })
            }
            return _creeps;   
        },
        
        findCreeps : function(filter) {
            return _.filter(this.creeps(), filter);
        }
        
    };
}