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
Handler.prototype.entry = function(msg, session, next) {
  var gameId = msg.gameId;
  this.app.rpc.connector.playerRemote.getUnusedId(session, gameId, function(id) {
    var result = {code: 200, msg: 'OK'}
    if (id == null) {
       result.code = 400;
       result.msg = '人数已达到设置上限，无法进入';
    }
    else {
       result.data = id; 
    }
    next(null, result);
  });
};

/**
 * Publish route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.publish = function(msg, session, next) {
	var result = {
		topic: 'publish',
		payload: JSON.stringify({code: 200, msg: 'publish message is ok.'})
	};
  next(null, result);
};

/**
 * Subscribe route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.subscribe = function(msg, session, next) {
	var result = {
		topic: 'subscribe',
		payload: JSON.stringify({code: 200, msg: 'subscribe message is ok.'})
	};
  next(null, result);
};

/**
 * Get Online User List
 */
Handler.prototype.getUserList = function(msg, session, next) {
    var sessionService = self.app.get('sessionService')
    next(null, {
        users: users,
        logined: current
    });
}
