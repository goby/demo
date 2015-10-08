var utils = module.exports;
var logger = require('pomelo-logger').getLogger('elb-log', __filename);

/**
 * Check and invoke callback function
 */
utils.invokeCallback = function(cb) {
  if(!!cb && typeof cb === 'function') {
    cb.apply(null, Array.prototype.slice.call(arguments, 1));
  }else{
    console.trace('cb not exist!');
    logger.warn(cb);
    logger.warn('cb not exist');
  }
};

/**
 * clone an object
 */
utils.clone = function(origin) {
  if(!origin) {
    return;
  }

  var obj = {};
  for(var f in origin) {
    if(origin.hasOwnProperty(f)) {
      obj[f] = origin[f];
    }
  }
  return obj;
};

utils.size = function(obj) {
  if(!obj) {
    return 0;
  }

  var size = 0;
  for(var f in obj) {
    if(obj.hasOwnProperty(f)) {
      size++;
    }
  }

  return size;
};

utils.randomNextInt = function(n) {
  var value = Math.random();
  return Math.floor(value * n);
};

utils.formatArgs = function(str){
  return '\"' + str + '\"';
};

utils.contained = function(array, obj){
  if(!array) return false;

  for(var i = 0; i < array.length; i++){
    if(array[i] === obj) return true;
  }

  return false;
};

utils.checkName = function(name, limit){
  if(!!limit && name.length > limit){
    return false;
  }
};

utils.isIPAddress = function(address){
  if(!address) return false;

  var ips = address.split(/\./);

  if(ips.length != 4) return false;

  for(var i = 0;  i < ips.length; i++){
    var ip = ips[i];

    if(ip === '') return false;

    if(ip < 0 || ip > 255) return false;
  }

  return true;
};

utils.convertToNumAvoidNaN = function(val) {
  var i = parseInt(val, 10);
  return isNaN(i) ? 0 : i;
};

utils.convertToFloatAvoidNaN = function(val) {
  var i = parseFloat(val);
  return isNaN(i) ? 0 : i;
};

utils.arrayToStr = function(ids){
  if(!ids || ids.length <= 0) return '';

  var result = '';

  for(var i = 0; i < ids.length; i++){
    result += ids[i];
    if(i < (ids.length - 1)) result += ',';
  }

  return result;
};

utils.inMap = function(obj, map){
  if(!map) return false;

  for (var key in map){
    if(obj == map[key]) return true;
  }

  return false;
};

utils.inArray = function(obj, array){
  if(!array) return false;

  for(var i = 0; i < array.length; i++){
    if(obj == array[i]) return true;
  }

  return false;
};

utils.toNum = utils.convertToNumAvoidNaN;