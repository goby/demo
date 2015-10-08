var pomelo = require('pomelo');
var sync   = require('pomelo-sync-plugin');

/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'demo');

// app configuration
app.configure('production|development', 'connector', function(){
  app.set('connectorConfig',
    {
      connector : pomelo.connectors.hybridconnector,
      heartbeat : 3,
      useDict : true,
      useProtobuf : true
    });

  //Init mysql config
  app.loadConfig('mysql', app.getBase() + '/config/mysql.json');
  var dbclient = require('./app/dao/mysql').init(app.get('mysql'));
  //app.use(sync, {sync: {path:__dirname + '/app/dao/mapping', dbclient: dbclient}});
});

// start app
app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});
