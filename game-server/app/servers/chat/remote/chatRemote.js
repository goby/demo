module.exports = function(app) {
    return new ChatRemote(app, app.get("chatService"));
};

var ChatRemote = function(app, service) {
    this.app = app;
    this.service = service;
}
