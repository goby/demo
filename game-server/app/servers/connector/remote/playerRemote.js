
module.exports = function(app) {
    return new PlayerRemote(app, app.get("playerService"));
};

var PlayerRemote = function(app, service) {
    this.app = app;
    this.service = service;
};

