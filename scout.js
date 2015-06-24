module.exports = function(){
    var flags = _.find(Game.flags, function(flag){
        return (flag.color == COLOR_WHITE);
    });
    
    for ( var id in Game.flags ) {
        var flag = Game.flags[id];
        if ( flag.color == COLOR_WHITE) {
            if ( !flag.memory.scout ) {
                var roleBuilder = require("role_builder");
                
                // not scout, build one
                var scoutName = "scout_" + flag.name;
                
                var scout = Game.spawns["Spawn1"].createCreep(roleBuilder.body, scoutName, { role : "scout", flag : flag.id});
                if ( _.isString(scout) ) {
                    flag.memory.scout = scoutName;
                    console.log("scout created", flag, scout);  
                } else {
                    console.log(scout);
                }
            } else {
                var creep = Game.creeps[flag.memory.scout];
                if ( creep ) {
                    if ( !flag.room || flag.room != creep.room ) {
                        creep.moveTo(flag);
                    } else {
                        var controller = flag.room.controller;
                        if ( controller.my ) {
                            flag.remove()
                            creep.memory.role = "builder";
                        } else {
                            creep.moveTo(controller);
                            creep.claimController(controller);
                        }
                    }
                } 
            }
        }
    }
};