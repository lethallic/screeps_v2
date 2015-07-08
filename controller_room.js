var utils = require("_utils");

function RoomController(gameController, room) {
    this._room = room;
    this._controller = gameController;
}

utils.extend(RoomController.prototype, {

    produce: function() {
        var debug = utils.debug("RoomController.process()");
        
        this._controller.factory.produce(this._room, this._controller.roleManager);
        
        utils.log(debug);
    },

    doCreeps: function() {
        var debug = utils.debug("RoomController.doCreeps()");
        
        var creeps = this._room.getCreeps();
        for (var c in creeps) {
            var creep = creeps[c];
            this._controller.roleManager.process(creep);
        }
        
        utils.log(debug);
    }

});

module.exports = RoomController;