var mysql = require('mysql');
var utils = require('../util/utils');
var logger = require('pomelo-logger').getLogger('mysql');
var daoLogger = require('pomelo-logger').getLogger('mysql');

// mysql CRUD
var sqlclient = module.exports;

var _pool = null;

var NND = {};

/*
 * Init sql connection pool
 * @param {Object} app The app for the server.
 */
NND.init = function(config){
  if(!_pool){
    _pool = mysql.createPool({
      connectionLimit : 10,
      host            : config.host,
      user            : config.user,
      password        : config.password,
      port            : config.port,
      database: config.database
    });
  }
};

var id = 0;

/**
 * Excute sql statement
 * @param {String} sql Statement The sql need to excute.
 * @param {Object} args The args for the sql.
 * @param {fuction} cb Callback function.
 *
 */
NND.query = function(sql, args, cb){
  _pool.getConnection(function(err, conn) {
    if (!!err) {
      logger.error('get connection failed!', err);
      cb(err);
    }else{
      id++;
      conn.__id = id;
      conn.query(sql, args, function(err, res) {
        if(err && err.fatal){
          logger.error('fatal error! release connection.', err);
          logger.debug('destroy conn, id : ', conn.__id);
          conn.destroy();
        }else{
          conn.release();
        }
        cb(err, res);
      });
    }
  });
};

NND.transaction = function(func, cb){
  _pool.getConnection(function(err, conn){
    if(err){
      logger.error('[get connection error! ] ', err);
      utils.invokeCallback(cb, err);
      return;
    }

    //Execute transaction
    logger.debug('begin transaction!');
    conn.beginTransaction(function(err){
      if(err){
        logger.error('start transaction failed!');
        conn.release();
        utils.invokeCallback(cb, err);
        return;
      }

      logger.debug('begin transaction success!');
      //Call the function with default connection at first param
      func.apply(null, [conn, function(err){
        if(err){
          logger.error('execute transation error! ', err);
          conn.rollback();
          logger.info('destroy connection');
          conn.destroy();

          utils.invokeCallback(cb, err);
          return;
        }

        var result = arguments;
        conn.commit(function(err){
          if(err){
            logger.error('commit transation failed! ', err);
            conn.rollback();
            conn.destroy();

            utils.invokeCallback(cb, err, result);
            return;
          }

          conn.release();
          logger.debug('transacton finish');
          cb.apply(null, result);
        });
      }]);
    });

  });
};

/**
 * Close connection pool.
 */
NND.shutdown = function(){
  _pool.destroyAllNow();
};

/**
 * init database
 */
sqlclient.init = function(config) {
  if (!!_pool){
    return sqlclient;
  } else {
    NND.init(config);
    sqlclient.update = NND.query;
    sqlclient.delete = NND.query;
    sqlclient.query = NND.query;
    sqlclient.transaction = NND.transaction;
    return sqlclient;
  }
};

/**
 * shutdown database
 */
sqlclient.shutdown = function() {
  NND.shutdown();
};
