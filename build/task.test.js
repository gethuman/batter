/**
 * Author: Jeff Whelpley
 * Date: 1/20/15
 *
 * Gulp task for testing
 */
var mocha       = require('gulp-mocha');
var istanbul    = require('gulp-istanbul');

module.exports = function (gulp, opts) {
    var reporter = opts.reporter || 'progress';
    var useTestCoverage = opts.cov;
    var taste = opts.taste;

    if (!taste) {
        throw new Error('Pass in taste to batter.whip');
    }

    // initialize taste so we can use it with our tests
    taste.firstBite(opts.targetDir);

    // function for running one of the tests
    function runTest(targetCode, testCode, done) {
        if (useTestCoverage) {
            gulp.src(targetCode)
                .pipe(istanbul())
                .pipe(istanbul.hookRequire())
                .on('finish', function () {
                    gulp.src(testCode)
                        .pipe(mocha({
                            growl: true,
                            ui: 'bdd',
                            reporter: reporter,
                            timeout: 5000
                        }))
                        .pipe(istanbul.writeReports({
                            dir: opts.testDir + '/coverage',
                            reportOpts: { dir: opts.testDir + '/coverage' }
                        }))
                        .on('end', done);
                });
        }
        else {
            gulp.src(testCode)
                .pipe(mocha({
                    growl: true,
                    ui: 'bdd',
                    reporter: reporter,
                    timeout: 5000
                }))
                .on('end', done);
        }
    }

    return {
        integration:  function (done) {
            runTest(opts.intTargetCode, opts.intTestCode, done);
        },
        'default': function (done) {
            runTest(opts.unitTargetCode, opts.unitTestCode, done);
        }
    };
};


