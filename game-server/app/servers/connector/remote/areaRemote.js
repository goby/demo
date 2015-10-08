module.exports = function(app) {
    return new AreaRemote(app, app.get("areaService"));
};

var AreaRemote = function(app, service) {
    this.app = app;
    this.service = service;
};
