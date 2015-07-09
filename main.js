
// var DEBUG = false;
// var _messages = [];

require("_init");

var utils = require("_utils");

utils.setDebug(false);
utils.log("------ NEW TICK ------");


var GameController = require("controller_game");
var gc = new GameController();

gc.doScout();
gc.processRooms();
gc.processGlobal();
