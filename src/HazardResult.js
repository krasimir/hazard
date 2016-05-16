var cssx = require('cssx');

module.exports = function (json) {
  var api = {};

  api.getJSON = function () {
    return json;
  };
  api.getCSS = function () {
    var func, sheet;

    cssx.clear();
    cssx.domChanges(false);
    cssx.minify(true);

    sheet = cssx();
    sheet.add(api.getJSON());
    return sheet.compileImmediate().getCSS();
  };

  return api;
}