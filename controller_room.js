var LinkController = require("controller_link");
var utils = require("_utils");

function RoomController(gameController, room) {
    this._room = room;
    this._controller = gameController;
    
    this.links = new LinkController(room);
}

utils.extend(RoomController.prototype, {
    
    produce: function() {
        this._controller.factory.produce(this._room, this._controller.roleManager);
    },

    doCreeps: function() {
        
        var creeps = this._room.getCreeps();
        for (var c in creeps) {
            var creep = creeps[c];
            this._controller.roleManager.process(creep);
            
        }
    },
    
    processLinks : function() {
        this.links.transfer();
    },
    
    attackSourceKeeper : function() {
        if ( this._room.getLevel() < 5 ) return;
        // if ( Game.time % 10 != 0 ) return;
        
        var flag = _.find(this._room.getFlags(), {color : COLOR_GREY});
        if ( flag != null ) {
            console.log(this._room, "grey flag found");
            
        }
    }

});

module.exports = RoomController;