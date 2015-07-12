/**
 * Wrapper class for internal snow-request
*/
var SnowRequest = require('./snow-request.js');
var request = new SnowRequest();

module.exports = {
    parseResort: function(name, elevation, cb, opts){
      request.parseResort(name, elevation, cb, opts);
    }
};
