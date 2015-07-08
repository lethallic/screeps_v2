
// var DEBUG = false;
// var _messages = [];

require("_init");

var utils = require("_utils");

utils.log("------ NEW TICK ------");


var GameController = require("controller_game");
var gc = utils.debugObject(new GameController());

gc.doScout();
gc.processRooms();
