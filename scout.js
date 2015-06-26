module.exports = function(){
    for ( var id in Game.flags ) {
        var flag = Game.flags[id];
        
        if ( flag.color == COLOR_WHITE) {
            var scouts = _.filter(Game.creeps, function(c) {
                if ( c.memory.role == "scout" || c.memory.role == "builder" ) {
                    return (c.memory.flag == flag.id);
                }
                return false; 
            });
            
            // console.log(scouts);
            // if ( !flag.memory.scout ) {
            if ( scouts.length < 2 ) {
                var roleBuilder = require("role_builder");
                
                // not scout, build one
                var scoutName = "scout_" + Math.round(Math.random() * 1000);
                
                var scout = Game.spawns["Spawn1"].createCreep(roleBuilder.body, scoutName, { role : "scout", flag : flag.id});
                if ( _.isString(scout) ) {
                    flag.memory.scout = scoutName;
                    console.log("scout created", flag, scout);  
                } else {
                    // console.log(scout);
                }
            } else {
                console.log(scouts)
                for ( var c in scouts ) {
                    var creep = scouts[c];
                    //var creep = Game.creeps[flag.memory.scout];
                    if ( creep ) {
                        if ( !flag.room || flag.room != creep.room || !creep.pos.inRangeTo(flag, 20) ) {
                            creep.moveTo(flag);
                        } else {
                            var controller = flag.room.controller;
                            if ( controller.my ) {
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
    }
};