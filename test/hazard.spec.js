var fs = require('fs');
var chai = require('chai');
var Hazard = require('../src/');
var fs = require('fs');
var path = require('path');

var expect = chai.expect;
var cssx = fs.readFileSync(__dirname + '/data/sample.cssx').toString();
var fixturesDir = __dirname + '/data/fixtures/';
var only = '2';

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

describe('Given the Hazard library', function () {
  describe('when passing cssx', function () {
    var result;

    before(function () {
      result = Hazard().fromCSSX(cssx);
    });

    it('should produce json', function () {
      expect(result.json).to.deep.equal({
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
      var expected = '.hd1{padding:0;}.hd2{font-size:20px;}.hd3{margin:0;padding:0;}.hd4{text-decoration:none;}';

      expect(result.css.text).to.equal(expected);
    });

    it('should produce html', function () {
      var expected = '<header class="hd1"><ul class="hd2"><li class="hd3"></li><a class="hd4"></a></ul></header>';

      expect(result.html.text).to.equal(expected);
    });

  });
  
  (typeof only !== 'undefined' ? describe.only : describe)('when reading fixtures', function () {
    getDirectories(fixturesDir).forEach(function (folder) {
      var actualCSSX = fs.readFileSync(fixturesDir + folder + '/actual.cssx').toString();
      var expectedCSS = fs.readFileSync(fixturesDir + folder + '/expected.css').toString();
      var expectedHTML = fs.readFileSync(fixturesDir + folder + '/expected.html').toString();
      describe('and when testing case ' + folder, function () {
        var result;
        var jsonResultFile = fixturesDir + folder + '/result.json';

        before(function () {
          result = Hazard().fromCSSX(actualCSSX);
          fs.writeFileSync(jsonResultFile, JSON.stringify(result.json, null, 2));
        });
        it('should produce expected css and html', function () {
          expect(result.html.text).to.be.equal(expectedHTML);
          expect(result.css.text).to.be.equal(expectedCSS);
          fs.unlink(jsonResultFile);
        });
      });
    });
  });
});