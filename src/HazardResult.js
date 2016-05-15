module.exports = function (json) {
  var api = {};

  api.get = function () {
    return json;
  }

  return api;
}