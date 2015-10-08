// 用来加在资源数据

var app = require("pomelo").app;
var dataApi = require("../../../util/dataApi");
var fs = require("fs");

module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};

Handler.prototype.loadResource = function(msg, session, next) {
    var data = {}
    data.area = dataApi.area.all();
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
