require("_extend");

var GameController = function(game) {
    var _game = game;
    
    this.system = require("_system");
    
    this.system.gc();
}

_.extend(GameController.prototype, {
    
    processRooms : function() {
        for ( var rn in _game.rooms ) {
            var room = _game.rooms[rn];
            this.processRoom(room);
        }
    },
    
    processRoom : function(room) {
        var debug = this.system.debug("controller.processRoom: " + room);
        
        
        
        this.system.debug(debug);
    },
    
    processGlobal : function() {
    
    }
    
});


module.exports = new GameController(Game);