var utils = require("_utils");

function RoomController(gameController, room) {
    this._room = room;
    this._controller = gameController;
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
    }

});

module.exports = RoomController;