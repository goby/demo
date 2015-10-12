// 
var app  = require('pomelo').app;
var xlsx = require('node-xlsx');

var area = require('../../config/data/area');

var xlsxData = xlsx.parse(app.getBase() + '/config/data.xlsx');

/**
 * Data model `new Data()`
 *
 * @param {Array}
 *
 */
var Data = function(data) {
  var fields = {};
  data[1].forEach(function(i, k) {
    fields[i] = k;
  });
  data.splice(0, 2);

  var result = {}, item;
  data.forEach(function(k) {
    item = mapData(fields, k);
    result[item.id] = item;
  });

  this.data = result;
};

/**
 * map the array data to object
 *
 * @param {Object}
 * @param {Array}
 * @return {Object} result
 * @api private
 */
var mapData = function(fields, item) {
  var obj = {};
  for (var k in fields) {
     var keys = k.split('.');
     var tmp = obj;
     keys.forEach(function(i, e) {
       if (e == keys.length - 1) tmp[i] = item[fields[k]];
       else if (!tmp[i]) tmp[i] = {};
       tmp = tmp[i];
     });
  }
  return obj;
};

/**
 * find items by attribute
 *
 * @param {String} attribute name
 * @param {String|Number} the value of the attribute
 * @return {Array} result
 * @api public
 */
Data.prototype.findBy = function(attr, value) {
  var result = [];
  var i, item;
  for (i in this.data) {
    item = this.data[i];
    if (item[attr] == value) {
      result.push(item);
    }
  }
  return result;
};

Data.prototype.findBigger = function(attr, value) {
  var result = [];
  value = Number(value);
  var i, item;
  for (i in this.data) {
    item = this.data[i];
    if (Number(item[attr]) >= value) {
      result.push(item);
    }
  }
  return result;
};

Data.prototype.findSmaller = function(attr, value) {
  var result = [];
  value = Number(value);
  var i, item;
  for (i in this.data) {
    item = this.data[i];
    if (Number(item[attr]) <= value) {
      result.push(item);
    }
  }
  return result;
};

/**
 * Find the largest id
 * @return {Obj}
 */
Data.prototype.findLast = function() {
  var last = 0;
  var i;
  for (i in this.data) {
    if (Number(i) > last) {
      last = Number(i);
    }
  }
  return this.data[last];
};

/**
 * find item by id
 *
 * @param id
 * @return {Obj}
 * @api public
 */
Data.prototype.findById = function(id) {
  return this.data[id];
};

/**
 * find all item
 *
 * @return {array}
 * @api public
 */
Data.prototype.all = function() {
  return this.data;
};

module.exports = {
  game: new Data(xlsxData[0].data),  
  area: new Data(xlsxData[1].data),  
  role: new Data(xlsxData[2].data), 
  event: new Data(xlsxData[3].data),
  task: new Data(xlsxData[4].data),
};
