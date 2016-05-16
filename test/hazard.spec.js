var fs = require('fs');
var chai = require('chai');
var Hazard = require('../src/');

var expect = chai.expect;
var cssx = fs.readFileSync(__dirname + '/data/fixtures/sample.cssx').toString();

describe('Given the Hazard library', function () {
  describe('when passing cssx', function () {
    var result;

    before(function () {
      result = Hazard().fromCSSX(cssx);
    });

    it('should produce json', function () {
      expect(result.getJSON()).to.deep.equal({
        'header': {
          'ul': {
            'li': {
              'margin': 0,
              'padding': 0
            },
            'a': {
              'text-decoration': 'none'
            },
            'font-size': '20px'
          },
          'padding': 0
        }
      });
    });

    it('should produce css', function () {
      var css = 'header{padding:0;ul{font-size:20px;li{margin:0;padding:0;}a{text-decoration:none;}}}';
      expect(result.getCSS()).to.equal(css);
    });

  });
});