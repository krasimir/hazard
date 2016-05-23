var toHTML = require('./toHTML');
var toCSS = require('./toCSS');

module.exports = function (json) {
  var api = {};
  var css = toCSS(json);
  var html = toHTML(json, css);

  api.json = json;
  api.css = css;
  api.html = html;

  return api;
}