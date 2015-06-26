function LevelConfig(minLevel, creepsConfig) {
    return {
        "minLevel": minLevel,
        "config": creepsConfig
    }
}

var buildList = [
    LevelConfig(1, {
        "worker": {
            body: [MOVE, WORK, CARRY],
            count: 4
        }
    }),
    LevelConfig(2, {
        "miner": {
            body: {MOVE, WORK, WORK},
            count: 1
        },
        "transporter": {
            body: {MOVE, MOVE, CARRY, CARRY},
            count: 2
        },
        "upgrader": {
            body: {MOVE, WORK, CARRY},
            count: 3
        }
    }),
    LevelConfig(3, {
        "miner":  {
            body: {MOVE, WORK, WORK, WORK, WORK},
            count: 1
        },
        "transporter":  {
            body: {MOVE, MOVE, MOVE, CARRY, CARRY, CARRY},
            count: 2
        },
        "upgrader":  {
            body: {MOVE, MOVE, WORK, WORK, CARRY, CARRY},
            count: 3
        }
    })
    /**
    ,LevelConfig(4, {
        "miner": {},
        "transporter": {},
        "upgrader": {}
    })
    */
];


module.exports = {
    _build: _.sortBy(buildList, function(l) {
        return l.minLevel;
    }),
    
    getConfig : function(room) {
        var list = null;
        if ( room && room.controller && room.controller.my ) {
            var level = room.controller.level;
            for ( var i in this._build ) {
                var l = this._build[i];
                if ( l.minLevel <= level ) {
                    list = l;
                } else {
                    break;
                }
            }
        }
        return null;
    }
    
};
