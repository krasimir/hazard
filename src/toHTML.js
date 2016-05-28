var isArray = require('./helpers/isArray');
var isEmpty = require('./helpers/isEmpty');
var contextArrayToStr = require('./helpers/contextArrayToStr');
var getClass = require('./helpers/getClass');
var parser = require('emmet/lib/parser/abbreviation');

module.exports = function (json, css) {
  var html = '';
  var addTag = function (tag, context) {
    var cls = getClass({ tagName: tag, context: contextArrayToStr(context) });
    var className = css.data[cls] && !isEmpty(css.data[cls].props) ? css.data[cls].selector : false;
    var parsed = parser.expand(tag, { profile: 'plain' }).replace(/(\n|\t)+?/g, '').split('><');
    var open = parsed[0] + '>';
    var close = '<' + parsed[1];

    if (className) {
      if (open.match('class=')) {
        open = open.replace('class="', 'class="' + className + ' ');
      } else {
        open = open.replace('>', ' class="' + className + '">');
      }
    }

    html += open;
    return function closeTag () {
      html += close;
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