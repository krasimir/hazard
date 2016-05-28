var cssxTranspiler = require('cssx-transpiler');
var HazardResult = require('./HazardResult');

var Hazard = function () {
  var api = {};

  api.fromCSSX = function (str) {
    var transpiled = cssxTranspiler('<style>' + str + '</style>', { minified: false });
    var func = new Function('return ' + transpiled);
    return api.fromJSON(func());
  };
  api.fromJSON = function (json) {
    return HazardResult(json);
  }

  return api;
};

module.exports = Hazard;
