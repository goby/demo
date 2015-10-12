// 用来加在资源数据

var app = require("pomelo").app;
var dataApi = require("../../../util/dataApi");
var fs = require("fs");

module.exports = function(app) {
    return new Handler(app);
};

/**
 * Get file'version
 *
 * @param {String} path, file path
 * @return {Number}
 * @api private
 */
var _getFileVersion = function(path) {
  return (new Date(fs.statSync(path).mtime)).getTime();
};

var Handler = function(app) {
    this.app = app;
};

Handler.prototype.loadResource = function(msg, session, next) {
    var data = {}
    var gameId = Number(msg.gameId);
   
    data.game = dataApi.game.findById(gameId);
    data.area = dataApi.area.findBy('gameId', gameId);
    // TODO: 初始化时需要加在的数据，添加其他信息在此
    //logger.debug(data.area);
    next(null, {
        data: data
    });
};

Handler.prototype.loadAreaResource = function(msg, session, next) {
    var data = {};
    var areaID = msg.id;
    
    next(null, {
        //tasks: 
    });
};
