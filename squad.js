module.exports = function(squadLeader) {
    var _leader = squadLeader;
    
    var options = {
        wingmen : {
            body : [MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK],
            count: 1
        },
        healer : {
            count : 1,
            body : [MOVE, MOVE, HEAL, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH];
        }
    }
    
    var _wingmen = _.filter(Game.creeps, function(creep) {
        return (creep.memory.role == "wingmen" && creep.memory.leader == _leader.name);
    });
    
    var _healears = _.filter(Game.creeps, function(creep) {
        return (creep.memory.role == "healer" && creep.memory.leader == _leader.name);
    });
    
    
    if ( _healears.length < options.healer.max ) {
            
    }
    
    if ( _wingmen.length < options.wingmen.length ) {
        
    }
    
}