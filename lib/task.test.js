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
    var testCode = opts.unitTestCode || 'test/unit/**/*.js';
    var targetCode = opts.unitTargetCode || 'lib/**/*.js';
    var testDir = opts.testDir || '..';
    var files = opts.files;
    var isCoverage = opts.cov;

    if (files) {
        testCode = 'test/unit/';
        if (files.substring(files.length - 3) === '.js') {
            testCode += 'test.' + files;
        }
        else {
            testCode += files + '/**/*.js';
        }
    }

    return function (done) {
        if (isCoverage) {
            gulp.src(targetCode)
                .pipe(istanbul())
                .on('finish', function () {
                    gulp.src(testCode)
                        .pipe(mocha({
                            growl: true,
                            ui: 'bdd',
                            reporter: reporter,
                            timeout: 5000
                        }))
                        .pipe(istanbul.writeReports({
                            dir: testDir + '/coverage',
                            reportOpts: { dir: testDir + '/coverage' }
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
    };
};