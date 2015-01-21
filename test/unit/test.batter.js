/**
 * Author: Jeff Whelpley
 * Date: 1/21/15
 *
 * Testing out batter
 */
var name    = 'lib/batter';
var taste   = require('taste');
var batter  = taste.target(name);

describe('UNIT ' + name, function () {
    describe('getOptions()', function () {
        it('should throw an error if no rootDir', function () {
            var fn = function () {
                batter.getOptions({});
            };

            fn.should.throw('batter must be whipped with rootDir!');
        });

        it('should throw an error if no require', function () {
            var fn = function () {
                batter.getOptions({ rootDir: 'blah' });
            };

            fn.should.throw('batter must be whipped with require!');
        });

        it('should set defaults', function () {
            var opts = { rootDir: 'foo', targetDir: 'blah', require: 'choo' };
            var expected = {
                rootDir: 'foo',
                targetDir: 'blah',
                require: 'choo',
                unitTestCode: 'test/unit/**/*.js',
                unitTargetCode: 'lib/**/*.js',
                testDir: 'test'
            };
            taste.addCommandLineArgs(expected);

            var actual = batter.getOptions(opts);
            actual.should.deep.equal(expected);
        });
    });

    describe('getPlugins()', function () {
        it('should return batter by default', function () {
            var rootDir = __dirname.replace('/test' + taste.delim + 'unit', '');
            var opts = { rootDir: 'blah' };
            var expected = [
                { rootDir: rootDir },
                { rootDir: 'blah' }
            ];
            var actual = batter.getPlugins(opts);
            actual.should.deep.equal(expected);
        });
    });
});