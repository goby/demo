// Area related handler
var dataApi = require('../../../util/dataApi')
var util    = require('../../../util/utils')

module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};

/**
 * New client entry.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.goto = function(msg, session, next) {
  var gameId = msg.gid;
  var uid = msg.uid;
  var aid = msg.aid; 
  var area = dataApi.area.findById(aid);
  if (!area) {
    next(null, {code: 404, msg: '找不到'});
    return;
  }
  area = util.clone(area);
  if (area.events != undefined) {
      var events = area.events.toString().split(',');
      area.events = [];
      events.forEach(function(tid) {
        area.events.push(dataApi.event.findById(tid)); 
      });
  }
  next(null, {data: area});
};
