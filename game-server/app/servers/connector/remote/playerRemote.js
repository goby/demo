
var dataApi = require('../../../util/dataApi');

module.exports = function(app) {
    return new PlayerRemote(app, app.get("playerService"));
};

var PlayerRemote = function(app, service) {
    this.app = app;
    this.service = service;
    this.players = [];
};

PlayerRemote.prototype.getUnusedId = function(gameId, cb) {
    var game = dataApi.game.findById(gameId);
    //console.log(game, gameId)
    cb(null, game.playerCount);
}

