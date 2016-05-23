module.exports = function (data) {
  return (data.context !== '' ? data.context + '->' : '') + data.tagName;
};
