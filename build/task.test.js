/**
 * Author: Jeff Whelpley
 * Date: 1/20/15
 *
 * Gulp task for testing
 */
var mocha       = require('gulp-mocha');
var istanbul    = require('gulp-istanbul');
var taste       = require('taste');

module.exports = function (gulp, opts) {
    var reporter = opts.reporter || 'progress';
    var useTestCoverage = opts.cov;

    // initialize taste so we can use it with our tests
    taste.firstBite({
        require: opts.require,
        rootDir: opts.rootDir
    });

    return function (done) {
        if (useTestCoverage) {
            gulp.src(opts.unitTargetCode)
                .pipe(istanbul())
                .pipe(istanbul.hookRequire())
                .on('finish', function () {
                    gulp.src(opts.unitTestCode)
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
            gulp.src(opts.unitTestCode)
                .pipe(mocha({
                    growl: true,
                    ui: 'bdd',
                    reporter: reporter,
                    timeout: 5000
                }))
                .on('end', done);
        }
    };
};