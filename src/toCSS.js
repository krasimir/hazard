var isArray = require('./helpers/isArray');
var isEmpty = require('./helpers/isEmpty');
var contextArrayToStr = require('./helpers/contextArrayToStr');
var getClass = require('./helpers/getClass');
var index = 0;

var generateClass = function () {
  return 'hd' + (++index);
}

var packStyles = function (styles) {
  var packed = {};

  styles.forEach(function(style) {
    var idx = getClass(style), prop;
    
    if (packed[idx]) {
      for (prop in style.props) {
        packed[idx].props[prop] = style.props[prop];
      }
    } else {
      packed[idx] = {
        props: style.props,
        context: style.context,
        selector: generateClass()
      }
    }
  });
  return packed;
};

var format = function (json) {
  var styles = [];
  var process = function (data, context) {
    var tagName, prop, props, tmp, style;

    for (tagName in data) {
      props = data[tagName];
      styles.push(style = {
        tagName: tagName,
        context: contextArrayToStr(context),
        props: {}
      });
      for (prop in props) {
        if (typeof props[prop] === 'object') {
          tmp = {};
          if (isArray(props[prop])) {
            props[prop].forEach(function (item) {
              tmp[prop] = item;
              process(tmp, context.concat([tagName]));
            });
          } else {  
            tmp[prop] = props[prop];        
            process(tmp, context.concat([tagName]));
          }
        } else {
          style.props[prop] = props[prop];
        }
      }
    }
  }

  process(json, []);
  return styles;
}

var wire = function (styles, packedStyles) {
  return styles.map(function (style) {
    var packed = packedStyles[getClass(style)];
    style.cls = packed.selector;
    return style;
  });
}

var generateCSS = function (styles) {
  var idx, css = '', prop;

  for (idx in styles) {
    if (!isEmpty(styles[idx].props)) {
      css += '.' + styles[idx].selector + '{';
      for (prop in styles[idx].props) {
        css += prop + ':' + styles[idx].props[prop] + ';';
      }
      css += '}';
    }
  }
  return css;
};

module.exports = function (json) {
  var formatted = format(json);
  var packedStyles = packStyles(formatted);

  index = 0;
  return {
    text: generateCSS(packedStyles),
    data: packedStyles
  }
}
