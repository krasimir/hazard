var isArray = require('./helpers/isArray');
var isEmpty = require('./helpers/isEmpty');
var contextArrayToStr = require('./helpers/contextArrayToStr');
var getClass = require('./helpers/getClass');

module.exports = function (json, css) {
  var html = '';
  var addTag = function (tag, context) {
    var cls = getClass({ tagName: tag, context: contextArrayToStr(context) });
    var className = css.data[cls] && !isEmpty(css.data[cls].props) ? css.data[cls].selector : false;

    html += '<' + tag + (className ? ' class="' + className + '"' : '') + '>';
    return function closeTag () {
      html += '</' + tag + '>';
    }
  };
  var process = function (data, context) {
    var close, tagName, tmp;

    for (tagName in data) {
      if (typeof data[tagName] === 'object') {
        if (isArray(data[tagName])) {
          data[tagName].forEach(function (item) {
            tmp = {};
            tmp[tagName] = item;
            process(tmp, context);
          });
        } else {
          close = addTag(tagName, context);
          process(data[tagName], context.concat([tagName]));
          close();  
        }
      }
    }
  };

  process(json, []);
  return {
    text: html
  }
};