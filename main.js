
// var DEBUG = false;
// var _messages = [];

require("_init");

var GameController = require("controller_game");
var gc = new GameController();
gc.doScout();
gc.processRooms();