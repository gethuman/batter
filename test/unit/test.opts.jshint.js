/**
 * Author: Jeff Whelpley
 * Date: 1/21/15
 *
 * Simple test just to make sure jshint options are there
 */
var name    = 'build/opts.jshint';
var taste   = require('taste');
var target  = taste.target(name);

describe('UNIT ' + name, function () {
    it('should return an object', function () {
        taste.should.exist(target);
        target.should.be.an('Object');
    });
});
