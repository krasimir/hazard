var fs = require('fs');
var chai = require('chai');
var Hazard = require('../src/');

var expect = chai.expect;
var cssx = fs.readFileSync(__dirname + '/data/fixtures/sample.cssx').toString();

describe('Given the Hazard library', function () {
  describe('when passing cssx', function () {
    it('should produce json', function () {
      var result = Hazard().fromCSSX(cssx);
      
      expect(result.get()).to.deep.equal({
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
  });
});