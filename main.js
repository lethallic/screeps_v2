
// var DEBUG = false;
// var _messages = [];

require("_init");

var utils = require("_utils");


var GameController = require("controller_game");
var gc = new GameController();


var dScout = utils.debug("Scout");
gc.doScout();
utils.log(debug);


var dRoom = utils.debug("gc.processRooms");
gc.processRooms();
utils.log(dRooms);